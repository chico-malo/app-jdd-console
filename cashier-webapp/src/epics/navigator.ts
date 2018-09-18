import { navigator as types } from 'common/constants/ActionTypes';
import { goBack, push, replace as replaceAction } from 'react-router-redux/actions';
import { getState } from 'common/core/store';

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/5/4
 */
export function navigate(action$) {
  return action$.ofType(types.navigate)
  // 过滤同一个路径
    .filter(({payload}) => {
      const {pathname} = getState().router.location;
      if (typeof payload === 'string') {
        return `/${payload[0]}` !== pathname;
      }
      const {routeName} = payload;
      return `/${routeName}` !== pathname;
    })
    .map(({payload}) => {
      if (typeof payload === 'string') {
        return push(`/${payload}`);
      }
      return push(`/${payload.routeName}`);
    });
}


export function replace(action$) {
  return action$.ofType(types.replace)
    .map(({payload}) => replaceAction(`/${payload}`));
}

export function back(action$) {
  return action$.ofType(types.back)
    .map(() => goBack(-1));
}
