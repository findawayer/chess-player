import React, { useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';

const ProgressBar: React.FC = () => {
  useEffect(() => {
    const moveIn = () => NProgress.start();
    const moveOut = () => NProgress.done();

    Router.events.on('routeChangeStart', moveIn);
    Router.events.on('routeChangeComplete', moveOut);
    Router.events.on('routeChangeError', moveOut);
  }, []);

  return null;
};

export default ProgressBar;
