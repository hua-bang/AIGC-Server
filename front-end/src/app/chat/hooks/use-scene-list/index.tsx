import { getSceneList } from "@/app/apis/scene-aigc";
import { SceneModule } from "@/app/typings/prompt";
import { message } from "antd";
import { useEffect, useState } from "react";

export const useSceneList = () => {
  const [sceneList, setSceneList] = useState<SceneModule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSceneList = async () => {
    try {
      setLoading(true);
      const { data } = await getSceneList();
      setSceneList(data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSceneList();
  }, []);

  return {
    loading,
    sceneList,
    fetchSceneList,
  };
}