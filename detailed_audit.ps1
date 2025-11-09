# Detailed audit to find specific missing translation patterns

$srcDir = "c:\Users\alhas\GKS-FINAL-WEBSITE\GKS-LOGISTICS-V2\src"
$results = @()

Get-ChildItem -Path $srcDir -Filter "*.html" | Sort-Object Name | ForEach-Object {
    $filePath = $_.FullName
    $fileName = $_.Name
    $content = Get-Content -Path $filePath -Raw
    
    # Extract missing elements for high-priority patterns
    $missingNav = @()
    $missingFooter = @()
    $missingButtons = @()
    $missingLabels = @()
    $missingH1h2h3 = @()
    
    # Check Nav
    if ($content -match '<nav[^>]*>' -and $content -notmatch '<nav[^>]*data-translate') {
        $missingNav = "NAV"
    }
    
    # Check Footer
    if ($content -match '<footer[^>]*>' -and $content -notmatch '<footer[^>]*data-translate') {
        $missingFooter = "FOOTER"
    }
    
    # Find buttons without data-translate
    $buttonMatches = [regex]::Matches($content, '<button[^>]*?>')
    foreach ($match in $buttonMatches) {
        if ($match.Value -notmatch 'data-translate') {
            $missingButtons += $match.Value.Substring(0, [Math]::Min(50, $match.Value.Length))
        }
    }
    
    # Find labels without data-translate
    $labelMatches = [regex]::Matches($content, '<label[^>]*>([^<]*)</label>')
    foreach ($match in $labelMatches) {
        $labelTag = $match.Value
        if ($labelTag -notmatch 'data-translate') {
            $missingLabels += $labelTag.Substring(0, [Math]::Min(60, $labelTag.Length))
        }
    }
    
    # Find h1, h2, h3 without data-translate
    $headingMatches = [regex]::Matches($content, '<h[123][^>]*>([^<]*)</h[123]>')
    foreach ($match in $headingMatches) {
        $headingTag = $match.Value
        if ($headingTag -notmatch 'data-translate') {
            $missingH1h2h3 += $headingTag.Substring(0, [Math]::Min(60, $headingTag.Length))
        }
    }
    
    $results += [PSCustomObject]@{
        File = $fileName
        MissingNav = if ($missingNav) { $missingNav } else { "" }
        MissingFooter = if ($missingFooter) { $missingFooter } else { "" }
        MissingButtonCount = $missingButtons.Count
        MissingLabelCount = $missingLabels.Count
        MissingHeadingCount = $missingH1h2h3.Count
        SampleMissingButton = if ($missingButtons.Count -gt 0) { $missingButtons[0] } else { "" }
        SampleMissingLabel = if ($missingLabels.Count -gt 0) { $missingLabels[0] } else { "" }
        SampleMissingHeading = if ($missingH1h2h3.Count -gt 0) { $missingH1h2h3[0] } else { "" }
    }
}

# Output to console
Write-Host "=== CRITICAL MISSING TRANSLATIONS BY FILE ===" -ForegroundColor Green
$results | Format-Table -AutoSize -Wrap

# Output summary
Write-Host "`n=== SUMMARY ===" -ForegroundColor Green
$navMissing = ($results | Where-Object { $_.MissingNav -ne "" } | Measure-Object).Count
$footerMissing = ($results | Where-Object { $_.MissingFooter -ne "" } | Measure-Object).Count
Write-Host "Files missing NAV translation: $navMissing"
Write-Host "Files missing FOOTER translation: $footerMissing"
Write-Host "`nFiles with most missing buttons:"
$results | Where-Object { $_.MissingButtonCount -gt 0 } | Sort-Object MissingButtonCount -Descending | Select-Object File, MissingButtonCount | Format-Table
