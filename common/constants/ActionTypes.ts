/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/19
 */
function create(type: String, actions: Object) {
  const result = {};
  Object.keys(actions).forEach(key => result[key] = `cashier_application_types@${type}@${key}`);
  return result;
}

export const bank: any = create('bank', {
  startQuery: null,
  queryComplete: null,
  startDelCard: null,
  delCardComplete: null,
  startUpdateCard: null,
  createUpdateComplete: null
});

export const cashier: any = create('cashier', {
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

export const config: any = create('config', {
  loadLocaleConfig: null,
  updateConfig: null,
  getConfig: null,
  getConfigComplete: null
});

export const merchant: any = create('merchant', {
  register: null,
  registerComplete: null,
  registerSecondStep: null,
  registerSecondStepComplete: null,
  updateProfile: null,
  updateProfileComplete: null,
  resetAdminPassword: null,
  resetAdminPasswordComplete: null,
  updateSettlement: null,
  updateSettlementComplete: null,
  queryMerchantInfo: null,
  queryMerchantInfoComplete: null,
  queryMerchantAnnex: null,
  queryMerchantAnneComplete: null,
  updateMerchantAnnex: null,
  updateMerchantAnnexComplete: null
});

export const navigator: any = create('navigator', {
  navigate: null,
  back: null,
  replace: null,
  reset: null,
  delRoute: null
});

export const operator: any = create('operator', {
  modifyPassword: null
});

export const position: any = create('position', {
  watch: null,
  clearWatch: null,
  set: null
});

export const payments: any = create('payments', {
  startQueryPayment: null,
  queryPaymentComplete: null
});

export const root: any = create('root', {
  startApp: null,
  stopApp: null,
  isDialog: null,
  bottomNavigationAction: null
});

export const session: any = create('session', {
  login: null,
  loginComplete: null,
  loadLoginUser: null,
  signOut: null
});

export const sms: any = create('sms', {
  sendSms: null,
  updateCountdown: null,
  resetCountdown: null
});
