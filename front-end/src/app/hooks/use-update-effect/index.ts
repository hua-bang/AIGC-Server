import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export const useUpdateEffect = (
  effect: EffectCallback,
  deps?: DependencyList | undefined
) => {
  const initRef = useRef(false);

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      return;
    }

    return effect();
  }, deps);
};
