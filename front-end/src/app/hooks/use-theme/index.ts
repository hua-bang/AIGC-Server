import { useEffect, useState } from "react";

// 定义主题类型
type Theme = "light" | "dark";

// 自定义Hook
function useTheme(): [Theme, () => void] {
  // 获取系统主题，默认为浅色模式
  const systemTheme: Theme =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  console.log("theme", systemTheme);

  // 使用useState来存储当前主题，初始值设置为系统主题
  const [theme, setTheme] = useState<Theme>(systemTheme);

  // 切换主题的函数
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  // 监听系统主题变化，并更新应用主题
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addListener(handleChange);

    // 组件卸载时移除监听器
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  // 使用useEffect来应用主题到document的body上，以便可以通过CSS变量等方式使用
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return [theme, toggleTheme];
}

export default useTheme;
