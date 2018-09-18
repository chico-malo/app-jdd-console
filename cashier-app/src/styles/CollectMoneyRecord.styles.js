import { backgroundColor, grayColor, headerFontColor, spacing } from './index';


const status = {
  flex: 1,
  textAlign: 'right',
  fontSize: 14
};

export const container = {
  flex: 1,
  backgroundColor,
  paddingTop: 2.5
};
export const section = {
  paddingHorizontal: 10,
  paddingVertical: 5,
  fontSize: 16,
  backgroundColor: headerFontColor,
  color: grayColor,
  borderBottomWidth: 1,
  borderBottomColor: backgroundColor
};

export const item = {
  flexDirection: 'row',
  padding: 10,
  backgroundColor: '#FFF',
  alignItems: 'center',
  minHeight: 65
};

export const itemIcon = {
  marginRight: spacing
};

export const itemContent = {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between'
};

export const itemContentItem = {
  flexDirection: 'row',
  justifyContent: 'space-between'
};

export const desc = {
  color: '#959EAD',
  fontSize: 12,
  marginTop: 7
};

export const amount = {
  flex: 1,
  fontSize: 18
};

export const inPayment = {
  ...status,
  color: '#d48737'
};

export const cancelled = {
  ...status,
  color: 'red'
};

export const paymentComplete = {
  ...status,
  color: '#00C901'
};

export const waitPayment = {
  ...status
};

