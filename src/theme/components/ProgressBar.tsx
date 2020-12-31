import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import NProgress from 'nprogress';

const ProgressBar: React.FC = () => {
  const router = useRouter();
  const moveIn = () => NProgress.start();
  const moveOut = () => NProgress.done();

  // Handle animation handlers to router change events.
  useEffect(() => {
    router.events.on('routeChangeStart', moveIn);
    router.events.on('routeChangeComplete', moveOut);
    router.events.on('routeChangeError', moveOut);
  }, [router]);

  return null;
};

export default ProgressBar;
