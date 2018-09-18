import 'babel-polyfill';
import * as React from 'react';
import bootstrap from 'veigar/bootstrap';

import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import createHashHistory from 'history/createHashHistory';

import create from 'web-common/components/svg/create';

import { initDB } from 'common/core/Repository';
import { create as createAppStore } from 'common/core/store';
import { setToast } from 'common/core/actionToast';

import { toast } from './component/toast';

import * as epics from './epics';
import * as reducers from './reducers';

import App from './container';

// web common svg create 初始化
(global as any).createSvgComponent = create;

// 初始化数据库
initDB({
  env: 'BROWSER'
});

// toast init
setToast(toast);
// Create a history of your choosing (we're using a browser history in this case)
const hashHistory = createHashHistory();

// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(hashHistory);

const store = createAppStore({...reducers, router: routerReducer}, epics, [historyMiddleware]);

bootstrap(() => (
  <Provider store={store}>
    <ConnectedRouter history={hashHistory}>
      <HashRouter>
        <App/>
      </HashRouter>
    </ConnectedRouter>
  </Provider>
));
