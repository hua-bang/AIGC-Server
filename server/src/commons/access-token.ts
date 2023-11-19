export abstract class AccessToken {
  protected accessToken: string;
  protected expiry: Date;

  async getToken(): Promise<string> {
    if (!this.accessToken || new Date() > this.expiry) {
      await this.refreshToken();
    }
    console.log(this.accessToken);
    return this.accessToken;
  }

  protected abstract refreshToken(): Promise<void>;
}
