/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/5/4
 */
import compose from './composeReducer';
import { bank as types } from '../constants/ActionTypes';

export interface defaultState {
  processing: boolean,
  cards: any
}

const DEFAULT_STATE: defaultState = {
  processing: false,
  cards: [{
    cardNo: '',
    issuer: '',
    cardType: '',
    isDefault: true
  }]
};

export default compose((state = DEFAULT_STATE, {type, payload}) => {
  switch (type) {
    case types.startQuery:
    case types.startDelCard:
    case types.startUpdateCard: {
      return {
        ...state,
        processing: true
      };
    }
    case types.queryComplete: {
      const {success, message} = payload;
      return {
        ...state,
        processing: false,
        cards: success ? message || DEFAULT_STATE.cards : state.cards
      };
    }
    case types.createUpdateComplete:
    case types.delCardComplete:
      return {
        ...state,
        processing: false
      };
    default:
      return state;
  }
}, DEFAULT_STATE);
