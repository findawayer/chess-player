import React from 'react';

import Header from '@components/Header';
import { ColorMode } from '@types';
import useStyles from './styles';

export interface LayoutProps {
  children: React.ReactNode;
  colorMode: ColorMode;
  toggleColorMode(): void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  colorMode,
  toggleColorMode,
}) => {
  /* CSS classes via Material UI */
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header colorMode={colorMode} toggleColorMode={toggleColorMode} />
      <div className={classes.body}>{children}</div>
    </div>
  );
};

export default Layout;
