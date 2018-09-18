import compose from './composeReducer';
import { session } from '../constants/ActionTypes';

const DEFAULT_STATE = {
  /**
   * 是否正在登录中
   */
  processing: false,
  loginSuccess: false,
  /**
   * 登录会话中的操作员信息
   */
  operator: {
    merchant: {
      status: '',
      merchantName: ''
    }
  }
};

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/19
 */
export default compose((state = DEFAULT_STATE, {type, payload}) => {
  switch (type) {
    case session.login: {
      return {
        ...state,
        processing: true
      }
    }
    case session.loginComplete: {
      const {success, message} = payload;
      return {
        ...state,
        processing: false,
        loginSuccess: success,
        operator: success ? message.operator : state.operator
      }
    }
    default:
      return state;
  }

}, DEFAULT_STATE);
