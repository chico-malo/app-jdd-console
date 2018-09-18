import { backgroundColor, complementary, isIphoneX, main } from './index';
// noinspection JSSuspiciousNameCombination

export const navHeader = {
  shadowOpacity: 0,
  elevation: 0,
  borderBottomWidth: 0
};

export const container = {
  flex: 1,
  backgroundColor
};

export const header = {
  backgroundColor: main,
  minHeight: 200,
  paddingVertical: 30,
  justifyContent: 'center'
};

export const top = {
  flexDirection: 'row'
};

export const left = {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
};

export const amount = {
  color: complementary,
  fontSize: 48
};

export const merchantName = {
  color: 'rgba(255,255,255,.7)',
  marginTop: 7,
  fontSize: 12
};

export const right = {};

export const qrcode = {
  width: 97,
  height: 97,
  resizeMode: 'contain'
};

export const passwordContainer = {
  marginTop: 15,
  alignItems: 'center'
};

export const password = {
  width: 220
};

export const details = {
  flex: 1,
  padding: 15
};

export const item = {
  height: 60,
  justifyContent: 'center'
};

export const itemTop = {
  flexDirection: 'row',
  alignItems: 'center'
};

export const dot = {
  backgroundColor: main,
  width: 8,
  height: 8,
  borderRadius: 8,
  marginRight: 15
};

export const itemTitle = {
  color: '#1F2A36',
  fontSize: 16
};

export const itemDesc = {
  paddingLeft: 23,
  marginTop: 7,
  color: '#7E848E',
  fontSize: 12
};

export const btnContainer = {
  margin: 0,
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0
};

export const btn = {
  borderRadius: 0,
  minHeight: isIphoneX ? 83 : 45,
  paddingBottom: isIphoneX ? 34 : 0
};

