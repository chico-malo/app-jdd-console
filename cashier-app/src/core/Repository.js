import Loki from 'lokijs';
import LokiReactNativeAdapter from 'reactnativecomponents/LokiReactNativeAdapter';


let dbOk = false;

const database = new Loki('cashier_database', {
  adapter: new LokiReactNativeAdapter(),
  autosave: true,
  autoload: true,
  autoloadCallback() {
    console.log('db load success');
    dbOk = true;
  }
});

const LOGIN_OPERATOR = 'LOGIN_OPERATOR';

const CONFIG = 'CONFIG';

function getCollection(name) {
  return new Promise((resolve) => {
    let task = setInterval(() => {
      if (dbOk) {
        let collection = database.getCollection(name);
        if (!collection) {
          collection = database.addCollection(name);
        }
        resolve(collection);
        clearInterval(task);
      }
    }, 100);
  });
}

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/3/17
 */
export default class Repository {

  /**
   * 查找登录用户
   */
  static async findLoginOperator() {
    const collection = await getCollection(LOGIN_OPERATOR);
    return collection.findOne();
  }

  /**
   * 保存登录
   * @param operator 登录用户信息
   */
  static async saveLoginOperator(operator) {
    const collection = await getCollection(LOGIN_OPERATOR);
    collection.insert(operator);
  }

  /**
   * 更新登录用户信息
   * @param user
   * @returns {Promise.<void>}
   */
  static async updateLoginOperator(user) {
    const collection = await getCollection(LOGIN_OPERATOR);
    collection.update(user);
  }

  /**
   * 删除登录用户的信息
   * @returns {Promise.<void>}
   */
  static async deleteLoginOperator() {
    const collection = await getCollection(LOGIN_OPERATOR);
    collection.clear();
  }

  static async saveConfig(config) {
    const collection = await getCollection(CONFIG);
    const server = collection.findOne({
      key: config.key
    });
    if (server) {
      await collection.update({
        ...server,
        ...config
      });
    } else {
      await collection.insert(config);
    }
  }

  static async findConfig(filter = {}) {
    const collection = await getCollection(CONFIG);
    return collection.find(filter);
  }

  static async findConfigByKey(key) {
    const collection = await getCollection(CONFIG);
    return collection.findOne({key});
  }

}
