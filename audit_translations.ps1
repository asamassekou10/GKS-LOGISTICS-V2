# PowerShell script to audit HTML files for translation attributes

$srcDir = "c:\Users\alhas\GKS-FINAL-WEBSITE\GKS-LOGISTICS-V2\src"
$results = @()

Get-ChildItem -Path $srcDir -Filter "*.html" | ForEach-Object {
    $filePath = $_.FullName
    $fileName = $_.Name
    $content = Get-Content -Path $filePath -Raw
    
    # Count data-translate attributes
    $translateCount = ([regex]::Matches($content, 'data-translate\s*=\s*["\'][\w-]+["\']').Count)
    
    # Check for SELECT elements with OPTION children
    $selectMatches = [regex]::Matches($content, '<select[^>]*>[\s\S]*?</select>')
    $selectWithOptions = 0
    $selectElements = @()
    foreach ($match in $selectMatches) {
        if ($match.Value -match '<option') {
            $selectWithOptions++
            $selectElements += $match.Value.Substring(0, [Math]::Min(100, $match.Value.Length))
        }
    }
    
    # Check for missing nav data-translate
    $navMissing = $content -match '<nav[^>]*>' -and $content -notmatch '<nav[^>]*data-translate'
    
    # Check for missing footer
    $footerMissing = $content -match '<footer[^>]*>' -and $content -notmatch '<footer[^>]*data-translate'
    
    # Check for form labels without translate
    $labelMatches = [regex]::Matches($content, '<label[^>]*>')
    $labelsWithoutTranslate = 0
    foreach ($match in $labelMatches) {
        if ($match.Value -notmatch 'data-translate') {
            $labelsWithoutTranslate++
        }
    }
    
    # Check for buttons without translate
    $buttonMatches = [regex]::Matches($content, '<button[^>]*>')
    $buttonsWithoutTranslate = 0
    foreach ($match in $buttonMatches) {
        if ($match.Value -notmatch 'data-translate') {
            $buttonsWithoutTranslate++
        }
    }
    
    # Check for h1-h6 without translate
    $headingMatches = [regex]::Matches($content, '<h[1-6][^>]*>')
    $headingsWithoutTranslate = 0
    foreach ($match in $headingMatches) {
        if ($match.Value -notmatch 'data-translate') {
            $headingsWithoutTranslate++
        }
    }
    
    $results += [PSCustomObject]@{
        FileName = $fileName
        TranslateAttributes = $translateCount
        SelectsWithOptions = $selectWithOptions
        NavMissing = $navMissing
        FooterMissing = $footerMissing
        LabelsWithoutTranslate = $labelsWithoutTranslate
        ButtonsWithoutTranslate = $buttonsWithoutTranslate
        HeadingsWithoutTranslate = $headingsWithoutTranslate
        TotalMissing = $labelsWithoutTranslate + $buttonsWithoutTranslate + $headingsWithoutTranslate
    }
}

$results | Sort-Object -Property TotalMissing -Descending | Format-Table -AutoSize
