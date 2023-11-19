export const CHAT_API_URL =
  'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/eb-instant';

export const ACCESS_TOKEN_URL = 'https://aip.baidubce.com/oauth/2.0/token';

export const ACCESS_TOKEN_INIT_PARAMS = {
  grant_type: 'client_credentials',
  // 请使用你的 Client ID 和 Client Secret
  client_id: process.env.WEN_XIN_ACCESS_TOKEN_CLIENT_ID,
  client_secret: process.env.WEN_XIN_ACCESS_TOKEN_CLIENT_SECRET,
};
