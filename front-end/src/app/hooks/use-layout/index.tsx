import React, { ReactNode, useState } from "react";
import styles from "./index.module.scss";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { getIsMobile } from "@/app/utils/mobile";

const useLayout = (options: useLayoutOptions) => {
  const [collapsed, setCollapsed] = useState(
    options?.defaultCollapsed ?? false
  );

  const { leftContent, rightContent } = options;

  const renderLayout = () => {
    return (
      <>
        <div className={styles.layoutWrapper}>
          <div
            className={styles.leftContent}
            style={{
              width: collapsed ? undefined : "0px",
            }}
          >
            {leftContent}
          </div>
          <div className={styles.rightContent}>{rightContent}</div>
        </div>
        {getIsMobile() && (
          <div className="fixed right-4 bottom-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded"
              onClick={() => {
                setCollapsed(true);
              }}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        )}
      </>
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
