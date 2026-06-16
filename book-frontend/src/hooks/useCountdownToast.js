import { useCallback, useEffect, useState } from "react";

export function useCountdownToast(durationSeconds = 3) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback(
    (message) => {
      const now = Date.now();

      setToast({
        id: now,
        message,
      });
    },
    []
  );

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setToast(null);
    }, durationSeconds * 1000);

    return () => window.clearTimeout(timer);
  }, [durationSeconds, toast]);

  return {
    closeToast,
    durationSeconds,
    showToast,
    toast,
  };
}
