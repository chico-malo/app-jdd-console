import HttpUtil from 'web-common/utils/HttpUtil';
import config from '../../config';

const base = config.commonApi;

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/3/24
 */
export default class QrcodeUtils {

  static getUrl(args) {
    return `${base}/qrcode?${HttpUtil.urlArgs(args)}`;
  }

}
