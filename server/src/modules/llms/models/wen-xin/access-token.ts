import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AccessToken } from 'src/commons/access-token';
import { ACCESS_TOKEN_INIT_PARAMS, ACCESS_TOKEN_URL } from './constants';

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

    // 调用文心一言的令牌获取 API
    console.log(ACCESS_TOKEN_URL, ACCESS_TOKEN_INIT_PARAMS);
    const response = await axios.post(url, null, {
      params: ACCESS_TOKEN_INIT_PARAMS,
    });
    const { data } = response;
    this.accessToken = data.access_token;
    // 设置令牌的有效期，减少10秒以避免边界问题
    const expiresIn = data.expires_in ? data.expires_in - 10 : 3600;
    this.expiry = new Date(new Date().getTime() + expiresIn * 1000);
  }
}
