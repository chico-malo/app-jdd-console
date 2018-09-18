import HttpUtil from 'web-common/utils/HttpUtil';
import { Platform } from 'react-native';
import { Observable } from 'rxjs/Observable';

import ErrorCode from 'web-common/constants/ErrorCode';
import { isQuickGatePay } from 'web-common/utils/BusinessUtils';

import { cashier, navigator } from '../constants/ActionTypes';
import Url, { commonApi } from '../constants/URL';
import * as Request from '../core/Request';
import actionToast from '../core/actionToast';
import { dispatch, getActions, getState } from '../core/store';
import { lang } from '../locale';


/**
 * 开始收款
 * @returns {Observable<R|I>|Observable<R>}
 */
export function startCollectMoney(action$) {
  return action$.ofType(cashier.startCollectMoney)
  // 检查是否获取到当前的地理位置
    .filter(() => {
      if (Platform.OS === 'web') {
        return true;
      }
      const {currentPosition} = getState().position;
      if (currentPosition) {
        return true;
      }
      alert({
        title: lang.collectMoneyFail,
        message: lang.deniedAccessLocation
      });
      dispatch({type: cashier.collectMoneyComplete});
      return false;
    })
    // 组装网络请求数据
    .map(({payload}) => {
      const {realMoney} = getState().cashier;
      let {currentPosition} = getState().position;
      const {businessType, bankCardId, authCode, callbackUrl} = payload;
      const body: any = {
        callbackUrl,
        businessType,
        amount: realMoney,
        bankCardId,
        authCode,
        payScene: 'QR_CODE',
        position: currentPosition,
      };
      if ((global as any).device) {
        const device = (global as any).device;
        body.device = `${device.versionName}_${device.versionCode}/${device.systemName}-${device.systemVersion}(${device.model}-${device.name})`
      }

      return body;
    })
    // 发送网络请求
    .switchMap(body => Request.execute({
      url: Url.payment,
      method: 'POST',
      body: JSON.stringify(body),
      inputValue: body
    }))
    .do(actionToast({successTip: false}))
    // 如果是信用卡，处理信用卡CVV信息错误
    .do(({success, status, inputValue}) => {
      if (!success) {
        if ([ErrorCode.BANK_CARD_HOLDER_ERROR, ErrorCode.CREDIT_CARD_WRONG_INFO].includes(status)) {
          console.log(`信用卡信息不正确${status}`);
          getActions().navigator.navigate({
            routeName: 'BankCardProfile',
            params: {
              id: inputValue.userBankCardId,
              // 更新成功以后重新发起交易
              onSuccess: () => dispatch({
                type: cashier.startCollectMoney,
                payload: inputValue
              })
            }
          });
        }
      }
    })
    // 如果是支付宝支付打开支付宝
    // .do(({success, message}) => {
    //   if (success) {
    //     const {businessType, payData} = message;
    //     if (businessType === BusinessType.aliPayScanQrcodePay) {
    //       console.log('使用支付宝支付,打开支付宝');
    //       openAliPayApp(payData);
    //     }
    //   }
    // })
    .do(({success, message, inputValue}) => {
      if (!isQuickGatePay(inputValue.businessType)) {
        return;
      }
      if (!success) {
        return;
      }
      const form = document.createElement('form');
      Object.keys(message).forEach(key => {
        const input = document.createElement('input');
        input.setAttribute('name', key);
        input.setAttribute('value', message[key]);
        input.setAttribute('type', 'hidden');
        form.appendChild(input);
      });
      form.setAttribute('method', 'POST');
      form.setAttribute('action', `${commonApi}/payment/quick-gate-pay`);
      document.body.appendChild(form);
      form.submit();
    })
    // 处理订单支付结果
    .mergeMap(payload => {
      const result = [Observable.of({
        type: cashier.collectMoneyComplete,
        payload
      })];
      if (payload.success) {
        if (!isQuickGatePay(payload.inputValue.businessType)) {
          result.push(
            Observable.of({
              type: cashier.getRecordComplete,
              payload
            }),
            Observable.of({
              type: navigator.navigate,
              payload: {
                routeName: 'CollectMoneyRecordDetail',
                params: payload.message.id
              }
            })
          );
        }
      }
      return Observable.merge(...result);
    });
}


/**
 * 查询交易记录
 * @param action$
 * @returns {Observable<any>}
 */
export function startQuery(action$) {
  return action$.ofType(cashier.startQuery)
    .map(({payload}) => ({
      ...payload,
      sort: 'id,desc'
    }))
    .switchMap((payload) => Request.execute({
      url: `${Url.paymentTrade}?${HttpUtil.urlArgs(payload)}`,
      type: cashier.queryComplete
    }));
}

/**
 * 获取单挑交易记录信息
 * @param action$
 * @returns {Observable<any>}
 */
export function startGetRecord(action$) {
  return action$.ofType(cashier.startGetRecord)
    .switchMap(({payload}) => Request.execute({
      url: `${Url.paymentTrade}/${payload}`,
      type: cashier.getRecordComplete
    }));
}
