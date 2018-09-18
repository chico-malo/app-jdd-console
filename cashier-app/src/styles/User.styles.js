import { Platform } from 'react-native';
import { backgroundColor, complementary, main, spacing } from './index';

export const container = {
  flex: 1,
  backgroundColor
};

export const header = {
  backgroundColor: 'transparent'
};

export const head = {
  backgroundColor: main,
  justifyContent: 'flex-start',
  paddingBottom: 15,
  borderRadius: 0,
  borderWidth: 0
};

export const avatar = {
  width: 55,
  height: 55,
  borderRadius: Platform.select({
    ios: 55 / 2,
    android: 100
  })
};

export const user = {
  marginLeft: spacing
};

export const nickname = {
  color: '#FFF'
};

export const desc = {
  color: '#FFF'
};

export const cells = {
  marginBottom: spacing
};
