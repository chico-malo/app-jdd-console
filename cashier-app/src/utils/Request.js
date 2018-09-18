import { Observable } from 'rxjs/Observable';
import Req from 'web-common/utils/Request';
import actionToast, { ToastArgs } from '../components/actionToast';
import Repository from '../core/Repository';

type
Params = {
  url: String,
  upload: Boolean,
  type: String,
  toastArgs: ToastArgs
};

/**
 * 网络请求封装
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/4/7
 */
class Request {

  static executeWithObservable(params: Params) {
    return Observable.fromPromise(Request.execute(params));
  }

  static async execute({headers, toastArgs, ...params}: Params) {
    const message = await Repository.findLoginOperator();
    const payload = await Req.execute({
      headers: {
        ...headers,
        'User-Agent': `Cashier/${device.versionName}_${device.versionCode}`,
        'X-Authentication': (message || {}).token || ''
      },
      ...params
    });

    if (toastArgs) {
      if (payload.type) {
        actionToast(toastArgs)(payload.payload);
      } else {
        actionToast(toastArgs)(payload);
      }
    }

    return payload;
  }

}

export default Request;
