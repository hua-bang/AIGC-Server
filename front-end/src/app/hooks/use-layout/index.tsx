import React, { ReactNode, useState } from "react";
import styles from "./index.module.scss";

const useLayout = (options: useLayoutOptions) => {
  const [collapsed, setCollapsed] = useState(options?.defaultCollapsed ?? true);

  const { leftContent, rightContent } = options;

  const renderLayout = () => {
    return (
      <div className={styles.layoutWrapper}>
        <div
          className={styles.leftContent}
          onClick={() => setCollapsed(!collapsed)}
          style={{ width: collapsed ? "225px" : "0px" }}
        >
          {leftContent}
        </div>
        <div className={styles.rightContent}>{rightContent}</div>
      </div>
    );
  };

  return {
    collapsed,
    setCollapsed,
    renderLayout,
  };
};

export interface useLayoutOptions {
  defaultCollapsed?: boolean;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
}

export default useLayout;
