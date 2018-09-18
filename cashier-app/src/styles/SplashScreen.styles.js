import { getWindowSize } from 'reactnativecomponents/styles';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/4/5
 */
export default {
  container: {
    flex: 1
  },
  splashScreen: {
    resizeMode: 'cover',
    width: getWindowSize().width,
    height: getWindowSize().height
  }
};
