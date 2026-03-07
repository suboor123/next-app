import re
import glob

def process(filepath, css_href):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Match: optional HTML comment + CDN script tag + tailwind.config script block
    pattern = (
        r'(?:<!--[^>]*[Tt]ailwind[^>]*-->\s*)?'
        r'<script[^>]*cdn\.tailwindcss\.com[^>]*></script>'
        r'\s*'
        r'<script(?:\s[^>]*)?>[\s\S]*?tailwind\.config[\s\S]*?</script>'
    )
    replacement = '<link rel="stylesheet" href="' + css_href + '">'
    new = re.sub(pattern, replacement, content, flags=re.MULTILINE)

    if new != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new)
        print('  OK: ' + filepath)
    else:
        print('  NO MATCH: ' + filepath)

print('Root HTML files:')
for f in glob.glob('/Users/210093/Desktop/portfolio/*.html'):
    process(f, 'style.css')

print('\nblogs/ HTML files:')
for f in glob.glob('/Users/210093/Desktop/portfolio/blogs/*.html'):
    process(f, '../style.css')

print('\nDone.')



