import { Platform } from 'react-native';
import { getWindowSize } from 'reactnativecomponents/styles';

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/19
 */
export const main = '#ED0000';
export const headerFontColor = '#FFF';
export const tintColor = '#FFF';
export const fontColor = '#333333';
export const backgroundColor = '#f0f0f0';

export const fontSize = 16;
export const titleFontSize = fontSize;
export const subtitleFontSize = titleFontSize - 4;
export const titleSubtitleSpacing = 7;
export const spacing = 10;


export const iconColor = {
  balance: '#FF0844',
  collectMoney: '#6196ED',
  record: '#F1C029',
  user: '#d81e06',
  settings: '#5C5E65',
  bankCard: '#009EFD',
  creditCardApply: '#2DA9DF',
  creditCardRepayment: '#efb336',
  treasureChest: '#2DA9DF',
  mpos: '#f7cc04',
  merchant: '#CF90E9',
  quickPay: '#f1c40f',
  aliPay: '#009FE8',
  weChatPay: '#00C901',
  weChatTimeline: '#4cd27c',
  weChatFavorite: '#5bd0be',
  promote: '#1296db',
  help: '#1296db',
  message: '#25CCFC',
  bill: '#ffb400'
};

export const headerStyle = {
  backgroundColor: main,
  borderBottomWidth: 0
};

export const titleStyle = {
  color: '#FFF'
};

export const isIphoneX = Platform.OS === 'ios' && getWindowSize().height === 812;
