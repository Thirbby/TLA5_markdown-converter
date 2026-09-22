const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

function convertMarkdown() {
  const text = markdownInput.value;

  const html = text
    .split("\n")
    .map((line) => {
      // Line-level conversions (must start at the beginning of the line)
      if (/^\s*###\s+(.*)$/.test(line)) {
        return line.replace(/^\s*###\s+(.*)$/, "<h3>$1</h3>");
      }
      if (/^\s*##\s+(.*)$/.test(line)) {
        return line.replace(/^\s*##\s+(.*)$/, "<h2>$1</h2>");
      }
      if (/^\s*#\s+(.*)$/.test(line)) {
        return line.replace(/^\s*#\s+(.*)$/, "<h1>$1</h1>");
      }
      if (/^\s*>\s+(.*)$/.test(line)) {
        return line.replace(/^\s*>\s+(.*)$/, "<blockquote>$1</blockquote>");
      }
      return line;
    })
    .join("")
    // Inline-level conversions
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/(\*\*|__)(.*?)\1/g, "<strong>$2</strong>")
    .replace(/(\*|_)(.*?)\1/g, "<em>$2</em>");

  return html;
}

markdownInput.addEventListener("input", () => {
  const converted = convertMarkdown();
  htmlOutput.textContent = converted;
  preview.innerHTML = converted;
});
