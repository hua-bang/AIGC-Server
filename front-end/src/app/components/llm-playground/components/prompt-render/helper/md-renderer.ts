import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // 或其他样式

export const mdRenderer = new marked.Renderer();

mdRenderer.code = (code: string, language: string) => {
  const validLang = hljs.getLanguage(language) ? language : "plaintext";
  const highlightedCode = hljs.highlight(code, { language: validLang }).value;
  return `<pre><code class="hljs ${validLang}">${highlightedCode}</code></pre>`;
};

marked.setOptions({ renderer: mdRenderer });

export default marked;
