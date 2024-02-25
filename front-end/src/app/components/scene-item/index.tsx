import { SceneModule } from "@/app/typings/prompt";
import styles from "./index.module.css";

interface SceneItemProps {
  scene: SceneModule;
  style?: React.CSSProperties;
  onSelect?: (scene: SceneModule) => void;
}

const SceneItem: React.FC<SceneItemProps> = (props) => {
  const { scene, style } = props;

  return (
    <div
      style={style}
      className={styles.sceneItem}
      onClick={() => props.onSelect?.(scene)}
    >
      <div>
        <img
          src={scene.imgSrc}
          alt={scene.name}
          className={styles.sceneItemImg}
        />
      </div>
      <div>
        <div className={styles.sceneItemName}>{scene.name}</div>
        <div className={styles.sceneItemDescription}>{scene.description}</div>
      </div>
    </div>
  );
};

export default SceneItem;
