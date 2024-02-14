import { getSceneList } from "@/app/apis/scene-aigc";
import { SceneModule } from "@/app/typings/prompt";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

export const useSceneList = () => {
  const [sceneList, setSceneList] = useState<SceneModule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { toast } = useToast();

  const fetchSceneList = async () => {
    try {
      setLoading(true);
      const { data } = await getSceneList();
      setSceneList(data.data);
    } catch (error: any) {
      toast({
        title: "Request Error",
        description: error.message,
        variant: 'destructive'
      });
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