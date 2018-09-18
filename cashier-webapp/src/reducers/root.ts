/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/5/4
 */
import compose from 'common/reducers/composeReducer';
import { root } from 'common/constants/ActionTypes';

export interface defaultState {
  isSnackBars: boolean,
  snackBarsMessage: any,
  isDialog: boolean,
  children: any,
  navigationValue: number
}

const DEFAULT_STATE: defaultState = {
  isSnackBars: false,
  snackBarsMessage: '',
  isDialog: false,
  children: '',
  navigationValue: 0
};

export default compose((state = DEFAULT_STATE, {type, payload}) => {
  switch (type) {
    // message弹框
    case root.openSnackBar: {
      const {isSnackBars, snackBarsMessage} = payload;
      return {
        ...state,
        isSnackBars: isSnackBars,
        snackBarsMessage: snackBarsMessage
      }
    }
    case root.closeSnackBar: {
      return {
        ...state,
        isSnackBars: false
      }
    }
    // 列表
    case root.isDialog: {
      const {isDialog, children} = payload;
      return {
        ...state,
        isDialog: isDialog,
        children: children
      }
    }
    case root.bottomNavigationAction: {
      return {
        navigationValue: payload
      }
    }
    default:
      return state;
  }
}, DEFAULT_STATE);
