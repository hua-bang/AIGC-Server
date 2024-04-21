import { axiosInstance } from "./base";

export const getUserInfo = () => {
  return axiosInstance.get("/user/getInfo");
};
