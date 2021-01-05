import { useEffect, useState } from 'react';

/**
 * Returns a boolean value telling the component is mounted.
 * Used to workaround SSR mismatch after client-side rehydration.
 */
export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};
