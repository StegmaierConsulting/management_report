// hooks/useAutoResizeTextarea.ts
import { useEffect, useRef } from 'react';

export const useAutoResizeTextarea = () => {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const adjustHeight = () => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = ref.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    adjustHeight();
  });

  return { ref, adjustHeight };
};
