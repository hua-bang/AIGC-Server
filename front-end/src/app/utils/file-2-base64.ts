/**
 * 将图片文件转成 base64
 * @param imgFile 图片文件
 * @returns { Promise<string> }
 */
export function imgFileToBase64(imgFile: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Result was not a string"));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(imgFile);
  });
}

/**
 * 将图片文件进行批量处理
 * @param imgFiles 图片文件数据
 * @returns base64 数组
 */
export function imgsToBase64Arr(imgFiles: File[]): Promise<string[]> {
  return Promise.all(imgFiles.map(imgFileToBase64));
}
