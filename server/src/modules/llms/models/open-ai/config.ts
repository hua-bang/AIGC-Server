import { ClientOptions } from 'openai';

export const MODEL_NAME = 'open-ai';

export const API_KEY = process.env.OPENAI_API_KEY;
export const BASE_URL = process.env.OPENAI_BASE_PATH;

export const DEFAULT_MAX_TOKEN = 4096;

export const defaultClientOptions: ClientOptions = {
  apiKey: API_KEY,
  baseURL: BASE_URL,
};

export const defaultModel = 'gpt-4-1106-preview';
export const defaultVisionModel = 'gpt-4-vision-preview';
