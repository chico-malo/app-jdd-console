/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/5/9
 */

import { payments } from 'common/constants/ActionTypes';
import * as Request from '../core/Request';
import URL from 'common/constants/URL';
import actionToast from 'common/core/actionToast';

export function startQueryPayment(action$) {
  return action$.ofType(payments.startQueryPayment)
    .switchMap(() => Request.execute({
      url: `${URL.paymentTrade}/today`,
      type: payments.queryPaymentComplete
    }))
    .do(actionToast({successTip: false, errorTip: false}))
}
