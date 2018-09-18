import DeviceManager from 'reactnativecomponents/DeviceManager';
import { config as configTypes, root, session } from '../constants/ActionTypes';
import { dispatch } from '../core/store';
import AmapLocation from 'reactnativecomponents/AmapLocation/index';
import config from '../../config';

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/19
 */
export function startApp(action$) {
  return action$.ofType(root.startApp)
  //加载登录用户信息
    .do(() => dispatch({
      type: session.loadLoginUser
    }))
    // 加载本地配置参数
    .do(() => dispatch({
      type: configTypes.loadLocaleConfig
    }))
    // 注册高德地图
    .do(() => AmapLocation.setApiKey({
      androidApiKey: config.amapAndroidApiKey,
      webApiKey: config.amapWebApiKey
    }))
    .do(() => DeviceManager.getDeviceInfo().then((device = {}) => {
      console.log('device -> ', device);
      global.device = device;
    }))
    .filter(() => false);
}
