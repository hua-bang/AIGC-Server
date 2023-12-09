import axios from "axios";
import { ChatParams } from "../apis-typings/basic-aigc";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

export const getAIChat = (params: ChatParams) => {
  return axiosInstance.post("/basic-aigc/chat", params, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
