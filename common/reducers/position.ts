import compose from './composeReducer';
import { position } from '../constants/ActionTypes';

const DEFAULT_STATE = {
  currentPosition: null,
};

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/3/2
 */
export default compose((state = DEFAULT_STATE, {type, payload}) => {
  switch (type) {
    case position.set: {
      return {
        ...state,
        currentPosition: payload
      }
    }
    default:
      return state;
  }
}, DEFAULT_STATE);
