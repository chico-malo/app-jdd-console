import md5 from 'md5';
import { Observable } from 'rxjs/Observable';
import { navigator, session } from '../constants/ActionTypes';
import Repository from '../core/Repository';
import URL from '../constants/URL';
import * as Request from '../core/Request';
import actionToast from '../core/actionToast';

export function login(action$) {
  return action$.ofType(session.login)
    .map(({payload}) => ({
      ...payload,
      password: md5(payload.password)
    }))
    .switchMap((payload) => Request.execute({
      url: URL.session,
      method: 'POST',
      body: JSON.stringify(payload)
    }))
    .do(actionToast({successTip: false}))
    .mergeMap((payload) => {
      const {success, message} = payload;
      const result = [Observable.of({
        type: session.loginComplete,
        payload
      })];
      if (success) {
        console.log('登录成功,保存登录用户数据', message);
        Repository.saveLoginOperator(message);
        result.push(Observable.of({
          type: navigator.replace,
          payload: 'Home'
        }));
      }
      return Observable.merge(...result);
    });
}

/**
 * 加载登录用户
 */
export function loadLoginUser(action$) {
  return action$.ofType(session.loadLoginUser)
    .switchMap(() => Observable.fromPromise(Repository.findLoginOperator()))
    .map((message) => ({
      type: session.loginComplete,
      payload: {
        success: !!message,
        message
      }
    }));
}

export function signOut(action$) {
  return action$.ofType(session.signOut)
    .mergeMap(() => {
      Repository.deleteLoginOperator();
      return Observable.merge(Observable.of({
        type: 'clear'
      }), Observable.of({
        type: navigator.reset,
        payload: 'Login'
      }));
    });

}
