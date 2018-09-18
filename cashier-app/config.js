import { Platform } from 'react-native';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/4/6
 */

const versionType = __DEV__ ? 'd' : 'p';

const config = {
  d: {
    commonApi: 'http://192.168.88.7:7001',
    api: 'http://192.168.88.7:7004',
    versionLabel: {
      ios: 99999,
      android: 99999
    },
    codePushKey: {
      android: '',
      ios: ''
    }
  },
  b: {
    commonApi: 'http://apptest.shangfudata.com/open/api',
    api: 'http://apptest.shangfudata.com/cashier/api',
    versionLabel: {
      ios: 0,
      android: 0
    },
    codePushKey: {
      android: '',
      ios: ''
    }
  },
  p: {
    commonApi: 'https://app.shangfudata.com/open/api',
    api: 'https://app.shangfudata.com/cashier/api',
    versionLabel: {
      ios: 0,
      android: 0
    },
    codePushKey: {
      android: '',
      ios: ''
    }
  }
};

export function getLabel() {
  return config[versionType].versionLabel[Platform.OS];
}

export function getDeploymentKey() {
  return config[versionType].codePushKey[Platform.OS];
}

export const auditAccount = '00000000000';

config[versionType].amapWebApiKey = 'e6c40868aa688e6be24eff57ecca88cf';
config[versionType].amapAndroidApiKey = '3435e7e82f34a50d144e6bc43c7e6622';

config[versionType].weChatAppId = 'wx9ec255893645d2c1';

export default config[versionType];

