import compose from './composeReducer';
import { merchant } from '../constants/ActionTypes';

const DEFAULT_STATE = {
  processing: false,
};

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/19
 */
export default compose((state = DEFAULT_STATE, {type}) => {
  switch (type) {
    case merchant.register:
    case merchant.registerSecondStep:
    case merchant.updateSettlement:
    case merchant.resetAdminPassword: {
      return {
        ...state,
        processing: true
      }
    }
    case merchant.registerComplete:
    case merchant.updateSettlementComplete:
    case merchant.registerSecondStepComplete:
    case merchant.resetAdminPasswordComplete: {
      return {
        ...state,
        processing: false
      }
    }
    default:
      return state;
  }

}, DEFAULT_STATE);
