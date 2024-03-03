import { useUserSetting } from "@/app/context/user-setting";

const useSetting = () => {
  const { renderSetting } = useUserSetting();

  return {
    renderSetting,
  };
};

export default useSetting;
