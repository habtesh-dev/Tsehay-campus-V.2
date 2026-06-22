import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Add dark mode for bg-slate-50 (main backgrounds) -> dark:bg-transparent
    # Only if dark:bg- isn't already there
    content = re.sub(r'(className="[^"]*\bbg-slate-50\b(?!.*dark:bg-))', r'\1 dark:bg-transparent', content)
    
    # Add dark mode for bg-white (cards/panels) -> dark:bg-[#111]
    content = re.sub(r'(className="[^"]*\bbg-white\b(?!.*dark:bg-))', r'\1 dark:bg-[#111111]', content)

    # Add dark mode for text-slate-900 / 800 -> dark:text-white
    content = re.sub(r'(className="[^"]*\btext-slate-[89]00\b(?!.*dark:text-))', r'\1 dark:text-white', content)
    
    # Add dark mode for text-slate-600 / 500 / 700 -> dark:text-slate-300
    content = re.sub(r'(className="[^"]*\btext-slate-[567]00\b(?!.*dark:text-))', r'\1 dark:text-slate-400', content)

    # Add dark mode for borders border-slate-200 / 100 -> dark:border-white/10
    content = re.sub(r'(className="[^"]*\bborder-slate-[12]00\b(?!.*dark:border-))', r'\1 dark:border-white/10', content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

def main():
    src_dir = r"c:\Users\Envy\OneDrive\Documents\Tsehay Campus - ሙሉ የ Full-Stack ኢ-ለ\tsehay-campus-v2\src"
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith('.tsx'):
                process_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
