import { config } from '../constants/ActionTypes';
import URL from '../constants/URL';
import * as Request from '../core/Request';
import { BusinessConfigKey, ConfigKey } from '../constants/Config';
import Repository from '../core/Repository';
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
    .mergeMap(message => {
      console.log('加载配置信息成功', message);
      const result: Array<any> = [];

      message.forEach(({key, value}) => {
        result.push(Observable.of({
          type: config.getConfigComplete,
          payload: {
            key,
            message: value
          }
        }));
      });

      Object.keys(ConfigKey).forEach(key => {
        console.log(`从服务端加载App配置信息 -> ${ConfigKey[key]}`);
        result.push(Observable.of({
          type: config.getConfig,
          payload: {
            url: `${URL.config}/${ConfigKey[key]}`,
            key: ConfigKey[key]
          }
        }));
      });

      Object.keys(BusinessConfigKey).forEach(key => {
        console.log(`从服务端加载业务配置信息 -> ${BusinessConfigKey[key]}`);
        result.push(Observable.of({
          type: config.getConfig,
          payload: {
            url: `${URL.businessConfig}/${BusinessConfigKey[key]}`,
            key: BusinessConfigKey[key]
          }
        }));
      });

      return Observable.merge(...result);
    });
}


export function getConfig(action$) {
  return action$.ofType(config.getConfig)
    .switchMap(({payload}) => Request.execute({
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

