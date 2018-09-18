import * as React from 'react';
import { Route } from 'react-router-dom';

import routes from '../core/router.config';
import '../styles/common.scss';
import { getState } from 'common/core/store';
import ErrorBoundary from '../component/ErrorBoundary';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import cyan from '@material-ui/core/colors/cyan';

const theme = createMuiTheme({
  palette: {
    primary: cyan,
  },
});


function createRender(route) {
  return props => {
    document.title = route.title || '';
    const params = getState().navigator.router[route.path];
    // pass the sub-routes down to keep nesting
    return (
      <route.component {...props}
                       params={params}
      />
    );
  };
}

export default () => (
  <MuiThemeProvider theme={theme}>
    <ErrorBoundary>
      {routes.map((route, index) => (
        <Route path={route.path}
               render={createRender(route)}
               key={index}
        />
      ))}
    </ErrorBoundary>
  </MuiThemeProvider>
);
