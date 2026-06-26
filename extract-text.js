import fs from "fs";

const html = fs.readFileSync("/Users/adityasingh/.gemini/antigravity/brain/927b596f-bc7b-4774-8b0c-9be2a53260d5/.system_generated/steps/187/content.md", "utf-8");

// Simple regex parser to find headings and paragraph text
const headings = [];
const headingRegex = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
let match;
while ((match = headingRegex.exec(html)) !== null) {
  headings.push({ level: match[1], text: match[2].replace(/<[^>]*>/g, "").trim() });
}

console.log("=== HEADINGS ===");
headings.forEach(h => {
  if (h.text) console.log(`H${h.level}: ${h.text}`);
});

// Let's also extract text inside elements with class containing 'title' or 'heading' or 'text'
console.log("\n=== INTERESTING TEXT SECTIONS ===");
const textRegex = /<[^>]+class="[^"]*(heading|title|hero|banner|text|description)[^"]*"[^>]*>([\s\S]*?)<\/[^>]+>/gi;
const seen = new Set();
let count = 0;
while ((match = textRegex.exec(html)) !== null && count < 100) {
  const text = match[2].replace(/<[^>]*>/g, "").trim().replace(/\s+/g, " ");
  if (text && text.length > 5 && text.length < 500 && !seen.has(text)) {
    seen.add(text);
    console.log(`- [${match[1]}]: ${text}`);
    count++;
  }
}
