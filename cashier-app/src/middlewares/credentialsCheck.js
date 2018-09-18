import toast from 'reactnativecomponents/toast';
import ErrorCode from 'web-common/constants/ErrorCode';
import { user } from '../constants/ActionTypes';
import { errorMsg } from '../locale';

/**
 * 用户没有授权拦截处理
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/5/2
 */
export default () => next => (action = {}) => {
  if (action.payload && action.payload.status && action.payload.status === ErrorCode.UNAUTHORIZED) {
    console.log('用户授权信息不正确');
    toast(errorMsg.unauthorized);
    return next({
      type: user.signOut
    });
  }
  return next(action);
};
