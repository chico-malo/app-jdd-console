import styles from 'reactnativecomponents/styles';
import { main } from './index';

// noinspection JSSuspiciousNameCombination
/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/3/2
 */

export const headerColor = '#FFF';

export const container = {
  flex: 1
};

export const header = {
  backgroundColor: main,
  shadowOpacity: 0,
  elevation: 0,
  borderBottomWidth: 0
};

export const headerText = {
  marginLeft: 5,
  color: headerColor
};

export const avatar = {
  width: 35,
  height: 35,
  borderRadius: 100,
  marginHorizontal: 15
};

export const headerCellGrid = {
  backgroundColor: main,
  paddingVertical: 15
};

export const cellGrid = {
  backgroundColor: '#FFF',
  paddingVertical: 10
};

export const cellBtn = {
  flex: 1,
  flexDirection: 'column',
  height: 90,
  borderRadius: 0,
  borderWidth: 0,
  ...styles.center
};

export const cellBtnText = {
  fontSize: 12,
  fontWeight: '700',
  marginTop: 7
};

export const tabBar = {
  backgroundColor: '#FFF'
};

export const swiper = {
  marginTop: 15,
  height: 100
};
