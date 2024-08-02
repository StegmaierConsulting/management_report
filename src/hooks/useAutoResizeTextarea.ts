// hooks/useAutoResizeTextarea.ts
import { useEffect, useRef } from 'react';

export const useAutoResizeTextarea = (value: string) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = ref.current.scrollHeight + 'px';
    }
  }, [value]);

  return ref;
};
