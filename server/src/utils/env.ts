import * as dotenv from 'dotenv';
dotenv.config();
/**
 * 根据键名获取 env 文件的值
 * @param key 键名
 * @returns 对应的值
 */
export const getEnvConfig = <Value extends string | number = string>(
  key: string,
): Value => {
  return process.env[key] as Value;
};
