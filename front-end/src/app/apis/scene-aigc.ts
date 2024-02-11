import { axiosInstance } from "./base";

export const getSceneList = () => {
  return axiosInstance.get("/scene-aigc/scene-list");
};