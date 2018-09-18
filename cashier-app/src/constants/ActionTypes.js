/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/19
 */
function create(type: String, actions: Object) {
  const result = {};
  Object.keys(actions).forEach(key => result[key] = `cashier_application_types@${type}@${key}`);
  return result;
}


export const cashier = create('cashier', {
  // 输入金额
  inputMoney: null,
  // 开始收款
  startCollectMoney: null,
  collectMoneyComplete: null,
  collectMoneyCancel: null,
  startQuickPaySubmit: null,
  quickPaySubmitComponent: null,
  // 打开支付宝支付
  openAliPay: null,
  openWeChatPay: null,
  startQuery: null,
  queryComplete: null,
  startGetRecord: null,
  getRecordComplete: null
});

export const config = create('config', {
  loadLocaleConfig: null,
  updateConfig: null,
  getConfig: null,
  getConfigComplete: null
});

export const merchant = create('merchant', {
  register: null,
  registerComplete: null,
  registerSecondStep: null,
  registerSecondStepComplete: null,
  updateProfile: null,
  resetAdminPassword: null,
  resetAdminPasswordComplete: null
});

export const navigator = create('navigator', {
  navigate: null,
  back: null,
  replace: null,
  reset: null,
  delRoute: null
});

export const operator = create('operator', {
  login: null,
  modifyPassword: null
});

export const position = create('position', {
  watch: null,
  clearWatch: null,
  set: null
});

export const root = create('root', {
  startApp: null,
  stopApp: null
});

export const user = create('user', {
  signOut: null
});

export const session = create('session', {
  login: null,
  loginComplete: null,
  loadLoginUser: null,
  signOut: null
});

export const sms = create('sms', {
  sendSms: null,
  updateCountdown: null,
  resetCountdown: null
});
