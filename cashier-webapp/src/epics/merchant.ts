/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/6/13
 */
import { merchant } from 'common/constants/ActionTypes';
import * as Request from '../core/Request';
import URL from 'common/constants/URL';
import actionToast from 'common/core/actionToast';

/**
 * 商家信息
 * @param action$
 * @returns {any}
 */
export function queryMerchantInfo(action$) {
  return action$.ofType(merchant.queryMerchantInfo)
    .switchMap(() => Request.execute({
      url: `${URL.merchant}/business`,
      type: merchant.queryMerchantInfoComplete
    }))
    .do(actionToast({successTip: false, errorTip: false}))
}

/**
 * 获取当前经营信息状态
 * @param action$
 * @returns {any}
 */
export function queryMerchantAnnex(action$) {
  return action$.ofType(merchant.queryMerchantAnnex)
    .switchMap(() => Request.execute({
      url: `${URL.merchant}/annex`,
      type: merchant.queryMerchantAnneComplete
    }))
    .do(actionToast({successTip: false, errorTip: false}))
}

export function updateMerchantAnnex(action$) {
  return action$.ofType(merchant.updateMerchantAnnex)
    .switchMap(({payload}): any => {
      const form: any = new FormData();
      form.append('annex', payload.annex, 'annex');
      console.log(payload, form);
      return Request.execute({
        url: `${URL.merchant}/annex/${payload.photoType}`,
        method: 'POST',
        body: form,
        upload: true,
        type: merchant.updateMerchantAnnexComplete
      });
    })
    .do(actionToast({successTip: false, errorTip: false, successPop: true}))
}
