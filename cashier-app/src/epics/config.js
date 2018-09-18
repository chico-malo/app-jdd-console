import { config } from '../constants/ActionTypes';
import URL from '../constants/URL';
import Request from '../utils/Request';
import { BusinessConfigKey, ConfigKey } from '../constants/Config';
import Repository from '../core/Repository';
import { dispatch } from '../core/store';
import { Observable } from 'rxjs/Observable';


/**
 * 加载本地配置，完成以后检查配置是否需要更新
 * @param action$
 * @returns {Observable<{type: null}>}
 */
export function loadLocaleConfig(action$) {
  return action$.ofType(config.loadLocaleConfig)
  // 加载本地缓存数据
    .switchMap(() => Observable.fromPromise(Repository.findConfig()))
    .do(message => {
      console.log('加载配置信息成功', message);
      message.forEach(({key, value}) => {
        let configKey = Object.keys(ConfigKey).find(item => ConfigKey[item] === key) || Object.keys(BusinessConfigKey).find(item => BusinessConfigKey[item] === key);
        dispatch({
          type: config.getConfigComplete,
          payload: {
            key: configKey,
            message: value
          }
        });
      });
    })
    .do(() => {
      Object.keys(ConfigKey).forEach(key => {
        console.log(`从服务端加载App配置信息 -> ${ConfigKey[key]}`);
        dispatch({
          type: config.getConfig,
          payload: {
            url: `${URL.config}/${ConfigKey[key]}`,
            key: ConfigKey[key]
          }
        });
      });
      Object.keys(BusinessConfigKey).forEach(key => {
        console.log(`从服务端加载业务配置信息 -> ${BusinessConfigKey[key]}`);
        dispatch({
          type: config.getConfig,
          payload: {
            url: `${URL.businessConfig}/${BusinessConfigKey[key]}`,
            key: BusinessConfigKey[key]
          }
        });
      });
    })
    .filter(() => false);
}


export function getConfig(action$) {
  return action$.ofType(config.getConfig)
    .switchMap(({payload}) => Request.executeWithObservable({
      url: payload.url,
      inputValue: payload.key
    }))
    .filter(({success}) => success)
    .do(async ({inputValue, message}) => await Repository.saveConfig({
      key: inputValue,
      updateAt: Date.now(),
      value: message
    }))
    .map(({inputValue, message}) => ({
      type: config.getConfigComplete,
      payload: {
        key: inputValue,
        message
      }
    }));
}

