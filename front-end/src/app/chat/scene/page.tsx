"use client";
import SceneItem from "@/app/components/scene-item";
import { useSceneList } from "../hooks/use-scene-list";
import styles from "./index.module.css";
import { SceneModule } from "@/app/typings/prompt";
import { useChatConfigContext } from "../context";
import { v4 as uuid } from "uuid";
import { ChatType } from "@/app/typings/llm";
import { useRouter } from "next/navigation";
import { SkeletonCard } from "./skeleton-card";

const ScenePage = () => {
  const { loading, sceneList } = useSceneList();

  const router = useRouter();

  const { handleChatChange } = useChatConfigContext() || {};

  const handleSceneSelect = (scene: SceneModule) => {
    const { prompt } = scene;

    const finalSystemPrompts = [
      {
        role: "assistant",
        content: prompt,
      },
    ];

    const nextChatId = uuid();

    handleChatChange?.({
      prompt: finalSystemPrompts,
      chatType: ChatType.Chat,
      id: nextChatId,
      modelName: "open-ai",
    });

    router.push(`/chat?chatId=${nextChatId}`, {});
  };

  return (
    <div className={styles.sceneWrapper}>
      <h2 className={styles.sceneTitle}>Scene</h2>
      <div className="mt-[20px] flex flex-wrap gap-[20px] p-[10px] w-full max-w-[1200px]">
        {loading ? (
          <SkeletonCard />
        ) : (
          sceneList.map((scene) => (
            <SceneItem
              style={{ width: "100%" }}
              key={scene.id}
              scene={scene}
              onSelect={handleSceneSelect}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ScenePage;
