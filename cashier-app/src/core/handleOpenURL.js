import { Platform } from 'react-native';
import { dispatch } from './store';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/10/12
 */

const uriPrefix = Platform.OS === 'android' ? 'empire://empire/' : 'empire://';

export default function handleOpenURL({url}) {
  console.log(url);
  const params = {};
  const delimiter = uriPrefix || '://';
  let path = url.split(delimiter)[1];
  if (typeof path === 'undefined') {
    path = url;
  }
  const action = router.getActionForPathAndParams(path, params);
  if (action) {
    dispatch(action);
  }
}
