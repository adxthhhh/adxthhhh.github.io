const fs = require('fs');
const content = fs.readFileSync('F:\\Users\\adith\\.gemini\\antigravity\\brain\\664ea036-95b4-4977-930c-98cb00c453ee\\.system_generated\\steps\\12\\content.md', 'utf8');

const regex = /<item>\s*<link>(.*?)<\/link>\s*<title>(.*?)<\/title>\s*<\/item>/gs;
let match;
const essays = [];

while ((match = regex.exec(content)) !== null) {
    essays.push({
        title: match[2].trim(),
        href: match[1].trim(),
        date: "PG Essay", // Placeholder
        readTime: "Link", // Placeholder
        excerpt: "Read this essay by Paul Graham."
    });
}

console.log(JSON.stringify(essays, null, 2));
