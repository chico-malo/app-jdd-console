import getErrMsg, { setErrMsg } from 'web-common/utils/getErrMsg';
import { getActions } from './store';
import { resErrMsg } from '../locale';

let toast: any = null;

setErrMsg(resErrMsg);

export function setToast(toastFunc) {
  toast = toastFunc;
}

/**
 * @param prefix 错误消息前缀
 * @param successTip 执行成功是否执行toast提示
 * @param errorTip 执行失败是否执行toast提示
 * @param successPop 执行成功是否执行返回动作
 */
export default ({prefix = '', successTip = true, errorTip = true, successPop = false} = {}) => args => {
  let payload = args;
  if (args.type) {
    payload = args.payload;
  }
  const msg = getErrMsg(payload, prefix);
  if (payload.success) {
    successTip && toast(msg);
    successPop && getActions().navigator.back();
  }
  if (!payload.success && errorTip) {
    toast(msg);
  }
};
