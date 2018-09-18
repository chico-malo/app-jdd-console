import compose from './composeReducer';
import { config } from '../constants/ActionTypes';

const DEFAULT_STATE = {
  /**
   * 收款方式
   */
  collectMethod: []
};

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/8
 */
export default compose((state = DEFAULT_STATE, {type, payload}) => {
  switch (type) {
    case config.getConfigComplete: {
      const {key, message} = payload;
      // 更新初始化的数据，避免用户退出的时候数据清空
      DEFAULT_STATE[key] = message;
      const result = {
        ...state,
      };
      result[key] = message;
      return result;
    }
    default:
      return state;
  }
}, DEFAULT_STATE);
