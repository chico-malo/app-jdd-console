import md5 from 'md5';
import { Observable } from 'rxjs/Observable';
import { merchant, navigator, operator } from '../constants/ActionTypes';
import URL from '../constants/URL';
import Request from '../utils/Request';
import Repository from '../core/Repository';

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/25
 */
export function register(action$) {
  return action$.ofType(merchant.register)
    .map(({payload}) => ({
      ...payload,
      password: md5(payload.password || '')
    }))
    .switchMap(payload => Request.executeWithObservable({
      url: URL.register,
      method: 'POST',
      body: JSON.stringify(payload),
      toastArgs: {prefix: 'register'},
      inputValue: payload
    }))
    .mergeMap(payload => {
      const {success, message, inputValue} = payload;
      const result = [Observable.of({
        type: merchant.registerComplete,
        payload
      })];
      if (success) {
        console.log('注册成功，进行自动登录');
        result.push(Observable.of({
          type: operator.login,
          payload: {
            loginName: message.merchantNo,
            password: inputValue.password
          }
        }));
        console.log('注册成功,进行注册第二步工作');
        result.push(Observable.of({
          type: navigator.replace,
          payload: 'RegisterSecondStep'
        }))
      }
      return Observable.merge(...result);
    });
}

export function registerSecondStep(action$) {
  return action$.ofType(merchant.registerSecondStep)
    .switchMap(({payload}) => Request.executeWithObservable({
      url: URL.registerSecondStep,
      method: 'POST',
      body: JSON.stringify(payload),
      toastArgs: {successTip: false}
    }))
    .mergeMap((payload) => {
      const {success} = payload;
      const result = [Observable.of({
        type: merchant.registerSecondStepComplete
      })];
      if (success) {
        result.push(Observable.of({
          type: navigator.replace,
          payload: 'Home'
        }), Observable.of({
          type: merchant.updateProfile
        }))
      }
      return Observable.merge(...result);
    });
}

export function updateProfile(action$) {
  return action$.ofType(merchant.updateProfile)
    .switchMap(() => Request.executeWithObservable({
      url: `${URL.merchant}/profiles`
    }))
    .do(async ({success, message}) => {
      if (!success) {
        return;
      }
      const loginMessage = await Repository.findLoginOperator();
      loginMessage.operator = message;
      await Repository.updateLoginOperator(loginMessage);
    })
    .filter(() => {
      return false;
    });
}


export function resetAdminPassword(action$) {
  return action$.ofType(merchant.resetAdminPassword)
    .map(({payload}) => ({
      ...payload,
      password: md5(payload.password)
    }))
    .switchMap((payload) => Request.executeWithObservable({
      url: `${URL.merchant}/admin/password`,
      method: 'PUT',
      body: JSON.stringify(payload),
      type: merchant.resetAdminPasswordComplete,
      toastArgs: {successPop: true, successTip: true, prefix: 'resetAdminPassword'}
    }));
}
