import { sms } from '../constants/ActionTypes';
import compose from './composeReducer';

const DEFAULT_STATE = {
  countdown: 0,
};

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/19
 */
export default compose((state = DEFAULT_STATE, {type}) => {
  switch (type) {
    case sms.updateCountdown: {
      let countdown = state.countdown;
      if (countdown) {
        countdown -= 1;
      } else {
        countdown = 60;
      }
      return {
        ...state,
        countdown
      };
    }
    case sms.resetCountdown:
      return {
        ...state,
        checkValueCountdown: 0
      };
    default:
      return state;
  }

}, DEFAULT_STATE);
