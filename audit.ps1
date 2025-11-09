# PowerShell audit script
$srcDir = "c:\Users\alhas\GKS-FINAL-WEBSITE\GKS-LOGISTICS-V2\src"
$results = @()

Get-ChildItem -Path $srcDir -Filter "*.html" | ForEach-Object {
    $filePath = $_.FullName
    $fileName = $_.Name
    $content = Get-Content -Path $filePath -Raw
    
    # Count data-translate attributes
    $translateCount = ([regex]::Matches($content, 'data-translate')).Count
    
    # Check for missing nav data-translate
    $navMissing = $content -match '<nav[^>]*>'
    
    # Check for footer
    $footerMissing = $content -match '<footer[^>]*>'
    
    # Count labels, buttons, headings without translate
    $labelCount = ([regex]::Matches($content, '<label[^>]*>')).Count
    $labelTranslate = ([regex]::Matches($content, '<label[^>]*data-translate')).Count
    $labelsWithoutTranslate = $labelCount - $labelTranslate
    
    $buttonCount = ([regex]::Matches($content, '<button[^>]*>')).Count
    $buttonTranslate = ([regex]::Matches($content, '<button[^>]*data-translate')).Count
    $buttonsWithoutTranslate = $buttonCount - $buttonTranslate
    
    $headingCount = ([regex]::Matches($content, '<h[1-6][^>]*>')).Count
    $headingTranslate = ([regex]::Matches($content, '<h[1-6][^>]*data-translate')).Count
    $headingsWithoutTranslate = $headingCount - $headingTranslate
    
    # Count select elements
    $selectCount = ([regex]::Matches($content, '<select[^>]*>')).Count
    
    $totalMissing = $labelsWithoutTranslate + $buttonsWithoutTranslate + $headingsWithoutTranslate
    
    $results += [PSCustomObject]@{
        File = $fileName
        Translate = $translateCount
        Labels = "$labelsWithoutTranslate/$labelCount"
        Buttons = "$buttonsWithoutTranslate/$buttonCount"
        Headings = "$headingsWithoutTranslate/$headingCount"
        Selects = $selectCount
        Nav = $navMissing
        Footer = $footerMissing
        Missing = $totalMissing
    }
}

$results | Sort-Object -Property Missing -Descending | Format-Table -AutoSize -Wrap
