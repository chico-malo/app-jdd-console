import { operator } from '../constants/ActionTypes';
import URL from '../constants/URL';
import md5 from 'md5';

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/19
 */
export function modifyPassword(action$) {
  return action$.ofType(operator.modifyPassword)
    .map(({payload}) => ({
      ...payload,
      oldPassword: md5(payload.oldPassword),
      password: md5(payload.password)
    }))
    .switchMap((payload) => Request.executeWithObservable({
      url: URL.modifyPassword,
      method: 'PUT',
      body: JSON.stringify(payload)
    }));
}
