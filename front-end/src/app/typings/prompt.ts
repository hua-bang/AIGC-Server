export type ChatVisionContent = Array<{
  type: string;
  text?: string;
  image_url?: {
    url: string;
  };
}>;

export interface PromptItem {
  role: "user" | string;
  content: string | ChatVisionContent;
}

/**
 * 场景的 prompt 接口
 */
export interface SceneModule {
  id: string;
  name: string;
  description: string;
  prompts: string[];
  imgSrc: string;
}

