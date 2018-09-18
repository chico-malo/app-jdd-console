/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/5/9
 */
import compose from 'common/reducers/composeReducer';
import { payments as types } from 'common/constants/ActionTypes';

export interface defaultState {
  payments: string
}

const DEFAULT_STATE: defaultState = {
  payments: '0.00',
};

export default compose((state = DEFAULT_STATE, {type, payload}) => {
  switch (type) {
    case types.queryPaymentComplete: {
      const {success, message} = payload;
      return {
        ...state,
        payments: success ? message : state.payments
      };
    }
    default:
      return state;
  }
}, DEFAULT_STATE);
