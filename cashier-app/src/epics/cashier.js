import { Linking, Platform, WebView } from 'react-native';
import { Observable } from 'rxjs/Observable';
import { createRootView } from 'reactnativecomponents/createRootNode';
import alert from 'reactnativecomponents/alert';

import ErrorCode from 'web-common/constants/ErrorCode';
import HttpUtil from 'web-common/utils/HttpUtil';

import { dispatch, getState } from '../core/store';
import { cashier, navigator } from '../constants/ActionTypes';
import Url from '../constants/URL';
import Request from '../utils/Request';
import { errorMsg, lang } from '../locale';
import { getLabel } from '../../config';
import CameraRoll from 'reactnativecomponents/CameraRoll/index';
import QrcodeUtils from '../utils/QrcodeUtils';

/**
 * 打开支付宝
 * @param uri 支付url
 */
function openAliPayApp(uri) {

  let manager;

  const onNavigationStateChange = ({url}) => {
    console.log(url);
    if (url.startsWith('https://ds.alipay.com/?from=mobilecodec&scheme=')) {
      let {scheme} = HttpUtil.queryToObjectWithUrl(url);
      scheme = decodeURIComponent(scheme);
      console.log(`打开支付宝支付 scheme = ${scheme}`);
      Linking
        .canOpenURL(scheme)
        .then(supported => {
          if (supported) {
            Linking.openURL(scheme);
            manager && manager.destroy();
          } else {
            alert({
              title: lang.openAliPayFail,
              message: lang.openAliPayFailDesc
            });
          }
        });
    }
  };

  manager = createRootView(WebView, {
    domStorageEnabled: true,
    javaScriptEnabled: true,
    onLoadEnd: () => manager.destroy(),
    onNavigationStateChange,
    source: {uri},
    style: {
      width: 0,
      height: 0
    }
  });
}


/**
 * 开始收款
 * @param action$ action
 * @returns {Observable<R|I>|Observable<R>}
 */
export function startCollectMoney(action$) {
  return action$.ofType(cashier.startCollectMoney)
  // 检查是否获取到当前的地理位置
    .filter(() => {
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
      const {businessType, userBankCardId, authCode} = payload;
      return {
        businessType,
        amount: realMoney,
        userBankCardId,
        authCode,
        payScene: 'QR_CODE',
        position: currentPosition,
        device: `${device.versionName}_${device.versionCode}_${getLabel()}/${device.systemName}-${device.systemVersion}(${device.model}-${device.name})`
      };
    })
    // 发送网络请求
    .switchMap(body => Request.executeWithObservable({
      url: Url.payment,
      method: 'POST',
      body: JSON.stringify(body),
      toastArgs: {successTip: false},
      inputValue: body
    }))
    // 如果是信用卡，处理信用卡CVV信息错误
    .do(({success, status, inputValue}) => {
      if (!success) {
        if ([ErrorCode.BANK_CARD_HOLDER_ERROR, ErrorCode.CREDIT_CARD_WRONG_INFO].includes(status)) {
          console.log(`信用卡信息不正确${status}`);
          actions.navigator.navigate({
            routeName: 'CreditCardCvvExpireDate',
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
    // 处理订单支付结果
    .mergeMap(payload => {
      const result = [Observable.of({
        type: cashier.collectMoneyComplete,
        payload
      })];
      if (payload.success) {
        result.push(
          Observable.of({
            type: cashier.getRecordComplete,
            payload
          }),
          Observable.of({
            type: navigator.navigate,
            payload: 'CollectMoneyRecordDetail'
          })
        );
      }
      return Observable.merge(...result);
    });
}

/**
 * 打开支付宝支付
 * @param action$
 * @returns {Observable<T>}
 */
export function openAliPay(action$) {
  return action$.ofType(cashier.openAliPay)
    .do(({payload}) => openAliPayApp(payload))
    .filter(() => false)
    .catch(e => {
      console.log('打开支付宝失败', e);
    });
}

export function openWeChatPay(action$) {
  return action$.ofType(cashier.openWeChatPay)
    .do(async ({payload}) => {
      const {paymentData, auditNumber} = payload;
      await CameraRoll.saveToCameraRoll(QrcodeUtils.getUrl({
        content: paymentData,
        title: auditNumber
      }));
      console.log('保存收款码到相册成功');
      const weixinUrl = Platform.OS === 'android' ? 'weixin://' : 'weixin://scanqrcode';
      const supported = await Linking.canOpenURL(weixinUrl);
      if (supported) {
        Linking.openURL(weixinUrl);
      } else {
        alert({
          title: lang.openWeChatFail,
          message: lang.openWeChatFailDesc
        });
      }
    })
    .filter(() => false)
    .catch(e => {
      console.log('打开微信支付失败', e);
    });
}


/**
 * 开始处理快捷支付短信验证码提交
 * 参数：
 * <pre>
 *     const payload = {
 *        recordId: Number,
 *        checkValue: String
 *     }
 * </pre>
 * @param action$
 * @returns {Observable<R>}
 */
export function startQuickPaySubmit(action$) {
  return action$.ofType(cashier.startQuickPaySubmit)
    .filter(({payload}) => {
      if (!payload || payload === '') {
        alert({
          title: lang.collectMoneyFail,
          message: errorMsg.checkValueIsEmpty
        });
        return false;
      }
      return true;
    })
    .switchMap(({payload}) => Request.executeWithObservable({
      url: Url.quickPaySubmit(payload.recordId),
      method: 'PATCH',
      body: payload.checkValue,
      actionToastArgs: {prefix: 'quickPaySubmit'},
      inputValue: payload.recordId
    }))
    .mergeMap(({success, inputValue}) => {
      const result = [Observable.of({type: cashier.quickPaySubmitComponent})];
      if (success) {
        console.warn('see code', inputValue);
        result.push(Observable.of({
          type: cashier.startGetRecord,
          payload: inputValue
        }));
      }
      return Observable.merge(...result);
    });
}

export function startQuery(action$) {
  return action$.ofType(cashier.startQuery)
    .map(({payload}) => ({
      ...payload,
      sort: 'id,desc'
    }))
    .switchMap((payload) => Request.executeWithObservable({
      url: `${Url.payment}?${HttpUtil.urlArgs(payload)}`,
      type: cashier.queryComplete
    }));
}


export function startGetRecord(action$) {
  return action$.ofType(cashier.startGetRecord)
    .switchMap(({payload}) => Request.executeWithObservable({
      url: `${Url.payment}/${payload}`,
      type: cashier.getRecordComplete
    }));
}
