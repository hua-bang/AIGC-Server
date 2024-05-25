import { ClientOptions } from 'openai';
import { getEnvConfig } from 'src/utils/env';

export const MODEL_NAME = 'open-ai';

export const DEFAULT_MAX_TOKEN = 4096;

export const getDefaultClientOptions = (): ClientOptions => ({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_PATH,
});

export const defaultModel = getEnvConfig('OPENAI_MODEL') || 'gpt-4o';
export const defaultVisionModel = 'gpt-4-vision-preview';
export const defaultImageModel = 'dall-e-3';
