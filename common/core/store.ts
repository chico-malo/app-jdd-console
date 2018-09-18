import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';

import { applyMiddleware, bindActionCreators, combineReducers, compose, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import * as commonReducers from '../reducers';
import * as commonEpics from '../epics';

import badCredentialsCheck from '../middlewares/badCredentialsCheck';
import loginSuccessAction from '../middlewares/loginSuccessAction';

import * as actionTypes from '../constants/ActionTypes';

const data: any = {};

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
export function create(reducers, epics, middlewares: Array<any>) {
  const rootReducers = combineReducers({
    ...commonReducers,
    ...reducers
  });

  const newEpics = {
    ...commonEpics
  };
  Object.keys(epics).forEach(typeKey => {
    if (commonEpics[typeKey]) {
      newEpics[typeKey] = {
        ...commonEpics[typeKey],
        ...epics[typeKey]
      }
    } else {
      newEpics[typeKey] = epics[typeKey];
    }
  });


  const appEpics: Array<any> = [];
  Object.keys(newEpics)
    .forEach(typeKey => Object.keys(newEpics[typeKey])
      .forEach(epicKey => appEpics.push(newEpics[typeKey][epicKey])));

  const rootEpics = combineEpics(...appEpics);
  const epicMiddleware = createEpicMiddleware(rootEpics);
  const finalCreateStore = compose(
    applyMiddleware(
      ...middlewares,
      badCredentialsCheck,
      loginSuccessAction,
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
  data.actions = actions;
  (global as any).actions = actions;
  return data.store;
}

export function getState() {
  return data.store.getState();
}

export function dispatch(...args) {
  data.store.dispatch(...args);
}

export function getActions() {
  return data.actions;
}
