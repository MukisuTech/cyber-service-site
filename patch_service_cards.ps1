$path = 'index.html'
$text = Get-Content $path -Raw
$pattern = '(?s)(<article[^>]*>.*?<div class="service-icon">)(<img\s+src="([^"]+)"([^>]*?)>)(.*?<h3>([^<]+)</h3>)'
$regex = [regex] $pattern
$text = $regex.Replace($text, {
    param($m)
    $prefix = $m.Groups[1].Value
    $src = $m.Groups[3].Value
    $rest = $m.Groups[4].Value
    $after = $m.Groups[5].Value
    $title = $m.Groups[6].Value.Trim()
    if ($rest -match 'alt="[^"]*"') {
        $rest = [regex]::Replace($rest, 'alt="[^"]*"', 'alt="' + $title + ' service in Kenya"')
    } else {
        $rest = $rest + ' alt="' + $title + ' service in Kenya"'
    }
    $img = '<img src="' + $src + '"' + $rest + '>'
    $after = [regex]::Replace($after, '<h3>([^<]+)</h3>', '<h2>$1</h2>')
    return $prefix + $img + $after
})
Set-Content $path $text -NoNewline
Write-Host 'patched service cards'