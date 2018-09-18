import { Platform } from 'react-native';
import { getWindowSize } from 'reactnativecomponents/styles';
import { fontColor, main } from '../../styles';


/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/10/27
 */
export const header = {
  marginTop: Platform.select({
    ios: getWindowSize().height === 812 ? -44 : -20,
    android: 0
  }),
  shadowOpacity: 0,
  elevation: 0,
  borderBottomWidth: 0,
  height: 45,
  backgroundColor: '#FFF',
};

export const bg = {
  backgroundColor: '#FFF',
  flex: 1
};

export const totalAmount = {
  textAlign: 'center',
  color: fontColor,
  fontSize: 48,
  fontWeight: '400',
  paddingVertical: 15
};

export const headerTextStyle = {
  color: '#787878',
  fontSize: 16
};

export const footerTextStyle = {
  color: '#1a1a1a',
  fontSize: 16
};

export const paymentNow = {
  backgroundColor: main,
  margin: 15
};

export const bodyText = {
  fontSize: 16
};

export const headerTintColor = '#1a1a1a';
