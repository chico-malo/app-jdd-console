/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/6/13
 */
import compose from 'common/reducers/composeReducer';
import { merchant as types } from 'common/constants/ActionTypes';

export interface defaultState {
  business: Array<object>;
}

const DEFAULT_STATE: defaultState = {
  business: [{
    title: '微信支付费率',
    valueRate: 'xx',
    valueFee: 'xx',
    icon: ''
  }]
};

export default compose((state = DEFAULT_STATE, {type, payload}) => {
  switch (type) {
    case types.queryMerchantInfoComplete: {
      const {success, message} = payload;
      console.log(payload);
      return {
        ...state,
        business: success ? message : state.business
      };
    }
    default:
      return state;
  }
}, DEFAULT_STATE);
