import { session } from '../constants/ActionTypes';
import { getActions } from '../core/store';

/**
 * 用户登录成功以后处理一些事情
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/5/15
 */
export default () => next => (action: any = {}) => {
  if (action.type === session.loginComplete && action.payload.success) {
    console.log('用户登录成功');
    getActions().merchant.updateProfile();
  }
  return next(action);
};
