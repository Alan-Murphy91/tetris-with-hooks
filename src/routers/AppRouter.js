import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TestContainer from '../containers/TestContainer/index';

const AppRouter = () => (
  <BrowserRouter>
    <React.Fragment>
      <Switch>
        <Route path="/" component={TestContainer} exact={true} />
      </Switch>
    </React.Fragment>
  </BrowserRouter>
);

export default AppRouter;
