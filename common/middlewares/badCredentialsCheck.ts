/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/4/25
 */
import ErrorCode from 'web-common/constants/ErrorCode';
import { navigator } from '../constants/ActionTypes';

/**
 * 无效的授权检查
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2016/10/8
 */
export default () => next => action => {
  const {payload} = action;
  if (payload && payload.status && payload.status === ErrorCode.UNAUTHORIZED) {
    console.log('用户授权不正确');
    return next({
      type: navigator.navigate,
      payload: 'Login'
    });
  }
  return next(action);
};
