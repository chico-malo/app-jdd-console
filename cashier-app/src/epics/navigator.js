/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2016/11/9
 */
import { NavigationActions } from 'react-navigation';
import { navigator } from '../constants/ActionTypes';
import { getState } from '../core/store';

function getRoute(payload) {
  let route = payload;
  if (typeof payload === 'string') {
    route = {
      routeName: payload,
      params: {}
    };
  }
  if (payload && payload.getParams) {
    route.params = payload.getParams(getState);
  }
  return route;
}

export function navigate(action$) {
  return action$.ofType(navigator.navigate)
    .filter(({payload}) => {
      const {index, routes} = getState().nav;
      const current = routes[index].routeName;
      if (payload === current) {
        return false;
      } else if (payload.routeName === current) {
        return false;
      }
      return true;
    })
    .map(({payload}) => NavigationActions.navigate(getRoute(payload, getState)));
}

export function back(action$) {
  return action$.ofType(navigator.back)
    .map(({payload}) => NavigationActions.back(payload || {}));
}

export function replace(action$) {
  return action$.ofType(navigator.replace)
    .map(({payload}) => {
      const {index, routes} = getState().nav;
      const actions = routes.map(route => NavigationActions.navigate(route));
      actions[index] = NavigationActions.navigate(getRoute(payload));
      return NavigationActions.reset({
        index,
        actions
      });
    });
}

export function reset(action$) {
  return action$.ofType(navigator.reset)
    .map(({payload}) => {
      let route = payload;
      if (typeof payload === 'string') {
        route = {
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: payload})
          ]
        };
      } else if (Array.isArray(payload)) {
        route = {
          index: 0,
          actions: payload.map(routeName => NavigationActions.navigate({
            routeName
          }))
        };
      }
      return NavigationActions.reset(route);
    });
}

export function delRoute(action$) {
  return action$.ofType(navigator.delRoute)
    .map(({payload}) => {
      const {routes} = getState().nav;
      const newRoutes = routes.filter(route => !payload.includes(route.routeName));
      const actions = newRoutes.map(route => NavigationActions.navigate(route));
      return NavigationActions.reset({
        index: newRoutes.length - 1,
        actions
      });
    });
}
