import { getWindow } from "./window";

export const getIsMobile = () => (getWindow()?.innerWidth || 0) < 700