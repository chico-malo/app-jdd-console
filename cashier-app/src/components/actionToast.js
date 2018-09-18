import toast from 'reactnativecomponents/toast';
import getErrMsg from 'web-common/utils/getErrMsg';


export
type
ToastArgs = {
  prefix: String,
  successTip: Boolean,
  errorTip: Boolean
};

/**
 * @param prefix 错误消息前缀
 * @param successTip 执行成功是否执行toast提示
 * @param errorTip 执行失败是否执行toast提示
 * @param successPop 执行成功是否执行返回动作
 */
export default ({prefix = '', successTip = true, errorTip = true, successPop = false} = {}) => payload => {
  const msg = getErrMsg(payload, prefix);
  if (payload.success) {
    successTip && toast(msg);
    successPop && actions.navigator.back();
  }
  if (!payload.success && errorTip) {
    toast(msg);
  }
};
