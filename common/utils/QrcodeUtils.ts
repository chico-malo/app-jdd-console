import HttpUtil from 'web-common/utils/HttpUtil';

const {commonApi} = (global as any).config;

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/3/24
 */
export default class QrcodeUtils {

  static getUrl(args) {
    return `${commonApi}/qrcode?${HttpUtil.urlArgs(args)}`;
  }

}
