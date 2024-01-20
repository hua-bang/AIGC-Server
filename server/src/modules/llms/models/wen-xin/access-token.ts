import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ACCESS_TOKEN_URL } from './constants';
import { AccessToken } from '../../../../commons/access-token';

@Injectable()
export class WenXinAccessToken extends AccessToken {
  protected accessToken: string;
  protected expiry: Date;

  constructor() {
    super();
  }

  protected async refreshToken(): Promise<void> {
    // 定义 API URL 和参数
    const url = ACCESS_TOKEN_URL;

    const params = {
      grant_type: 'client_credentials',
      // 请使用你的 Client ID 和 Client Secret
      client_id: process.env.WEN_XIN_ACCESS_TOKEN_CLIENT_ID,
      client_secret: process.env.WEN_XIN_ACCESS_TOKEN_CLIENT_SECRET,
    };
    const response = await axios.post(url, null, {
      params,
    });
    const { data } = response;
    this.accessToken = data.access_token;
    // 设置令牌的有效期，减少10秒以避免边界问题
    const expiresIn = data.expires_in ? data.expires_in - 10 : 3600;
    this.expiry = new Date(new Date().getTime() + expiresIn * 1000);
  }
}
