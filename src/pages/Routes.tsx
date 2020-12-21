import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Landing from '@pages/Landing';
import NotFound from '@pages/NotFound';
import Play from '@pages/Play';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/play" component={Play} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
