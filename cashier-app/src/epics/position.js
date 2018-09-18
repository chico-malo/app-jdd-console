import { Linking, PermissionsAndroid, Platform } from 'react-native';
import AmapLocation from 'reactnativecomponents/AmapLocation';
import toast from 'reactnativecomponents/toast';
import { position } from '../constants/ActionTypes';

import { lang } from '../locale';

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/19
 */
let watchId;


function handleNoAccessFineLocationPermission(code) {
  if (Platform.OS === 'android' && code === 12) {
    console.log('Android 无权限访问GPS信息');
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
      title: lang.deniedAccess,
      message: lang.deniedAccessLocation
    }).then(granted => {
      if (granted === true || granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('成功获取ACCESS_FINE_LOCATION权限');
        actions.root.getCurrentPosition();
      } else {
        console.log('获取ACCESS_FINE_LOCATION失败');
        toast(lang.deniedAccessLocation);
        actions.navigator.back();
      }
    });
  } else if (Platform.OS === 'ios' && code === 1) {
    alert({
      title: lang.deniedAccess,
      message: lang.deniedAccessLocation,
      button: {
        text: lang.goSettings,
        onPress() {
          Linking.openURL('app-settings:');
          actions.navigator.back();
        }
      }
    });
  }
}

export function watch(action$) {
  return action$.ofType(position.watch)
    .filter(() => {
      watchId = AmapLocation.watchPosition(position => {
        console.log('获取当前位置成功->', position);
        actions.position.set(position);
      }, error => {
        console.log('获取当前位置失败', error);
        handleNoAccessFineLocationPermission(error.code);
        actions.position.set();
      }, {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      });
      return false;
    });
}

export function clearWatch(action$) {
  return action$.ofType(position.clearWatch)
    .filter(() => {
      watchId && AmapLocation.clearWatch(watchId);
      watchId = null;
      return false;
    });
}
