/**
 * 复制到剪贴板
 * @param text 需要复制的文本
 */
export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (error) {}
    document.body.removeChild(textArea);
  }
}

/**
 * 复制到剪贴板并提示
 * @param text 需要复制的文本
 */
export async function copyToClipboardWithMessage(text: string) {
  try {
    await copyToClipboard(text);
    // TODO: 添加成功提示
  } catch (error) {
    // TODO: 添加失败提示
  }
}
