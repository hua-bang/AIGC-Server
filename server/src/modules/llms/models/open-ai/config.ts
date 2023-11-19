import { ClientOptions } from 'openai';

export const MODEL_NAME = 'open-ai';

export const DEFAULT_MAX_TOKEN = 4096;

export const getDefaultClientOptions = (): ClientOptions => ({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_PATH,
});

export const defaultModel = 'gpt-4-1106-preview';
export const defaultVisionModel = 'gpt-4-vision-preview';
