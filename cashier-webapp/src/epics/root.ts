/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/5/4
 */
import * as Request from 'common/core/Request';
import { bank } from 'common/constants/ActionTypes';
import URL from 'common/constants/URL';

// 防止报错，后期删除
export function startQuery(action$) {
  return action$.ofType(bank.startQuery)
    .switchMap(() => Request.execute({
      url: URL.bankCard,
      type: bank.queryComplete
    }));
}
