export abstract class AccessToken {
  // accessToken: 用于存储访问令牌的字符串。
  protected accessToken: string;
  // expiry: 记录令牌到期时间的 Date 对象。
  protected expiry: Date;

  /**
   * getToken: 异步方法，用于获取当前的访问令牌。
   * 如果当前没有令牌或令牌已过期，它将首先调用 refreshToken 方法来刷新令牌。
   * @returns 返回一个 Promise，解析为当前的访问令牌字符串。
   */
  async getToken(): Promise<string> {
    if (!this.accessToken || new Date() > this.expiry) {
      await this.refreshToken();
    }
    return this.accessToken;
  }

  /**
   * refreshToken: 一个抽象方法，需在派生类中实现。
   * 用于异步刷新访问令牌。
   * @returns 返回一个 Promise，表示令牌刷新操作的完成。
   */
  protected abstract refreshToken(): Promise<void>;
}
