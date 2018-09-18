import { applyMiddleware, bindActionCreators, combineReducers, compose, createStore } from 'redux';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import appReducers from '../reducers';
import appEpics from '../epics';

import credentialsCheck from '../middlewares/credentialsCheck';

import * as actionTypes from '../constants/ActionTypes';

const data = {};

function getPayload(args) {
  if (args.length === 0) {
    return null;
  } else if (args.length === 1) {
    return args[0];
  }
  return args;
}

/**
 * @author Sean(sean.snow@live.com)
 * @date 2016/12/19
 */
export function create(reducers) {
  const rootReducers = combineReducers({
    ...reducers,
    ...appReducers
  });

  // Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
  const reactNavigationReduxMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav,
  );

  const epics = [];
  Object.keys(appEpics)
    .forEach(typeKey => Object.keys(appEpics[typeKey])
      .forEach(epicKey => epics.push(appEpics[typeKey][epicKey])));

  const rootEpics = combineEpics(...epics);
  const epicMiddleware = createEpicMiddleware(rootEpics);
  const finalCreateStore = compose(
    applyMiddleware(
      reactNavigationReduxMiddleware,
      credentialsCheck,
      epicMiddleware
    )
  )(createStore);

  data.store = finalCreateStore(rootReducers);

  let actions = {};
  Object.keys(actionTypes).forEach(action => Object.keys(actionTypes[action]).forEach(type => {
    if (!actions[action]) {
      actions[action] = {};
    }
    actions[action][type] = bindActionCreators((...args) => ({
      type: actionTypes[action][type],
      payload: getPayload(args)
    }), data.store.dispatch);
  }));
  global.actions = actions;

  return data.store;
}

export function getState() {
  return data.store.getState();
}

export function dispatch(...args) {
  data.store.dispatch(...args);
}
