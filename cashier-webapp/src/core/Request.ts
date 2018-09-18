/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/4/25
 */
import Request from 'web-common/utils/Request';
import Repository from 'common/core/Repository';

export async function execute({headers, ...args}: any) {
  let storage: any = await Repository.findLoginOperator() || {};
  let token = storage.token;
  const newHeaders: any = {
    ...headers
  };
  newHeaders['X-Authentication'] = token;
  return await Request.execute({
    ...args,
    headers: newHeaders
  });
}
