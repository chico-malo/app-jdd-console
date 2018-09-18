import { sms } from '../constants/ActionTypes';
import { dispatch, getState } from '../core/store';
import URL from '../constants/URL';
import Request from '../utils/Request';


/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/20
 */
export function sendSms(action$) {
  return action$.ofType(sms.sendSms)
    .filter(() => {
      const {countdown} = getState().sms;
      if (countdown) {
        console.warn('当前状态不能发送验证码');
        return false;
      }
      return true;
    })
    .do(() => {
      const timer = setInterval(() => {
        if (getState().sms.countdown) {
          dispatch({
            type: sms.updateCountdown
          });
        } else {
          clearInterval(timer);
        }
      }, 1000);
      dispatch({
        type: sms.updateCountdown
      });
    })
    .switchMap(({payload}) => Request.executeWithObservable({
      url: URL.sms,
      method: 'POST',
      body: JSON.stringify(payload),
      toastArgs: {
        successTip: false,
        prefix: payload.prefix || ''
      }
    }))
    .map(({success, status}) => {
      if (!success) {
        console.log('短信发送失败', status);
        return {type: sms.resetCountdown};
      }
      return {type: ''};
    });
}
