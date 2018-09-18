import md5 from 'md5';
import * as Request from '../core/Request';
import { merchant, navigator, session } from '../constants/ActionTypes';
import URL from '../constants/URL';
import actionToast from '../core/actionToast';
import Repository from '../core/Repository';
import { Observable } from 'rxjs/Observable';

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/5/4
 */
export function register(action$) {
  return action$.ofType(merchant.register)
    .switchMap(({payload}) => Request.execute({
      url: URL.register,
      method: 'POST',
      body: JSON.stringify({
        ...payload,
        password: md5(payload.password || '')
      }),
      inputValue: payload
    }))
    .do(actionToast({prefix: 'register'}))
    .mergeMap(payload => {
      const {success, message, inputValue} = payload;
      const result = [Observable.of({
        type: merchant.registerComplete,
        payload
      })];
      if (success) {
        console.log('注册成功，进行自动登录');
        result.push(Observable.of({
          type: session.login,
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

/**
 * 重置管理员密码
 * @param action$
 * @returns {Observable<any>}
 */
export function resetAdminPassword(action$) {
  return action$.ofType(merchant.resetAdminPassword)
    .map(({payload}) => ({
      ...payload,
      password: md5(payload.password)
    }))
    .switchMap((payload) => Request.execute({
      url: `${URL.merchant}/admin/password`,
      method: 'PUT',
      body: JSON.stringify(payload),
      type: merchant.resetAdminPasswordComplete
    }))
    .do(actionToast({successPop: true, successTip: true, prefix: 'resetAdminPassword'}));
}


/**
 * 更新商户信息
 * @param action$
 * @returns {Observable<any>}
 */
export function updateProfile(action$) {
  return action$.ofType(merchant.updateProfile)
    .switchMap(() => Request.execute({
      url: `${URL.merchant}/profiles`
    }))
    .filter(({success}) => success)
    .do(async ({message}) => {
      const loginMessage = await Repository.findLoginOperator();
      loginMessage.operator = message;
      await Repository.updateLoginOperator(loginMessage);
    })
    .map(({message}) => ({
      type: merchant.updateProfileComplete,
      payload: message
    }));
}


export function registerSecondStep(action$) {
  return action$.ofType(merchant.registerSecondStep)
    .switchMap(({payload}) => Request.execute({
      url: URL.registerSecondStep,
      method: 'POST',
      body: JSON.stringify(payload)
    }))
    .do(actionToast({successTip: false}))
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

/**
 * 更新结算信息
 * @param action$
 * @returns {Observable<any>}
 */
export function updateSettlement(action$) {
  return action$.ofType(merchant.updateSettlement)
    .switchMap(({payload}) => Request.execute({
      url: `${URL.merchant}/account`,
      method: 'PUT',
      body: JSON.stringify(payload)
    }))
    .do(actionToast())
    .mergeMap((payload) => {
      const {success} = payload;
      const result = [Observable.of({
        type: merchant.updateSettlementComplete
      })];
      // 判断成功，更新结算信息数据并返回前一个页面
      if (success) {
        result.push(Observable.of({
          type: merchant.updateProfile
        }), Observable.of({
          type: navigator.back
        }));
      }
      return Observable.merge(...result);
    });
}
