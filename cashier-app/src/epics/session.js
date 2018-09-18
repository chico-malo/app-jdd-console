import md5 from 'md5';
import { Observable } from 'rxjs/Observable';
import { navigator, session } from '../constants/ActionTypes';
import Request from '../utils/Request';
import URL from '../constants/URL';
import Repository from '../core/Repository';
import MerchantStatus from '../constants/MerchantStatus';

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/20
 */
export function login(action$) {
  return action$.ofType(session.login)
    .map(({payload}) => ({
      ...payload,
      password: md5(payload.password)
    }))
    .switchMap((payload) => Request.executeWithObservable({
      url: URL.session,
      method: 'POST',
      body: JSON.stringify(payload),
      toastArgs: {successTip: false}
    }))
    .mergeMap((payload) => {
      const {success, message} = payload;
      const result = [Observable.of({
        type: session.loginComplete,
        payload
      })];
      if (success) {
        console.log('登录成功,保存登录用户数据', message);
        Repository.saveLoginOperator(message);
        const {status} = message.operator.merchant;
        console.log(`当前商户状态->${status}`);
        result.push(Observable.of({
          type: navigator.replace,
          payload: status === MerchantStatus.waitActive ? 'RegisterSecondStep' : 'Home'
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

