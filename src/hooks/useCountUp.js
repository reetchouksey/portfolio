import { useEffect, useRef, useState } from "react";

export function useCountUp(target = 0, duration = 1500, start = false) {
  const [value, setValue] = useState(0);
  const startedAt = useRef(null);
  const raf = useRef(null);

  useEffect(() => {
    if (!start) return;
    startedAt.current = null;

    const tick = (t) => {
      if (startedAt.current == null) startedAt.current = t;
      const elapsed = t - startedAt.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        raf.current = requestAnimationFrame(tick);
      }
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration, start]);

  return value;
}
