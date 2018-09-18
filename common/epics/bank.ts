/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/5/4
 */
import { Observable } from 'rxjs/Observable';
import * as Request from '../core/Request';
import { bank, root } from '../constants/ActionTypes';
import URL from '../constants/URL';
import actionToast from '../core/actionToast';

export function startQuery(action$) {
  return action$.ofType(bank.startQuery)
    .switchMap(() => Request.execute({
      url: URL.bankCard,
      type: bank.queryComplete
    }))
    .filter(({payload}) => payload.success);
}

export function startDelCard(action$) {
  return action$.ofType(bank.startDelCard)
    .switchMap(({payload}) => Request.execute({
      url: `${URL.bankCard}/${payload}`,
      method: 'DELETE'
    }))
    .do(actionToast({errorTip: true}))
    .mergeMap((payload) => {
      const {success} = payload;
      const result = [Observable.of({
        type: bank.delCardComplete
      })];
      if (success) {
        // 成功再次发送卡片请求
        result.push(Observable.of({
          type: bank.startQuery
        }), Observable.of({
          type: root.isDialog,
          payload: {
            isDialog: false
          }
        }));
      }
      return Observable.merge(...result);
    })
}

export function startUpdateCard(action$) {
  return action$.ofType(bank.startUpdateCard)
    .switchMap(({payload}) => Request.execute({
      url: URL.bankCard,
      method: payload.isUpdate && 'PATCH' || 'POST',
      body: JSON.stringify(payload),
      type: bank.createUpdateComplete
    }))
    .do(actionToast({
      errorTip: true,
      successPop: true
    }));
}
