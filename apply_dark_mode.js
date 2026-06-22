const fs = require('fs');
const path = require('path');

function processFile(filepath) {
    const original = fs.readFileSync(filepath, 'utf8');
    let content = original;

    // Add dark mode for bg-slate-50 (main backgrounds) -> dark:bg-transparent
    content = content.replace(/(className="[^"]*\bbg-slate-50\b(?!.*dark:bg-))/g, '$1 dark:bg-transparent');
    
    // Add dark mode for bg-white (cards/panels) -> dark:bg-[#111111]
    content = content.replace(/(className="[^"]*\bbg-white\b(?!.*dark:bg-))/g, '$1 dark:bg-[#111111]');

    // Add dark mode for text-slate-900 / 800 -> dark:text-white
    content = content.replace(/(className="[^"]*\btext-slate-[89]00\b(?!.*dark:text-))/g, '$1 dark:text-white');
    
    // Add dark mode for text-slate-600 / 500 / 700 -> dark:text-slate-400
    content = content.replace(/(className="[^"]*\btext-slate-[567]00\b(?!.*dark:text-))/g, '$1 dark:text-slate-400');

    // Add dark mode for borders border-slate-200 / 100 -> dark:border-white\/10
    content = content.replace(/(className="[^"]*\bborder-slate-[12]00\b(?!.*dark:border-))/g, '$1 dark:border-white/10');

    if (content !== original) {
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`Updated ${filepath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            processFile(fullPath);
        }
    }
}

const srcDir = path.join(__dirname, 'src');
walkDir(srcDir);
console.log("Done updating dark mode classes!");
