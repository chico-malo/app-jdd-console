import { lang as commonLang } from 'web-common/locales/zh-cn';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/3/1
 */
export const lang = {
  ...commonLang,
  settings: '设置',
  message: '消息',
  describe: '描述',
  remark: '备注',

  yuan: '元',
  scan: '扫一扫',
  balance: '余额',
  collectMoney: '收款',
  collectMoneyRecord: '收款记录',
  collectMoneyFail: '收款失败',
  collectMoneyAuditNumber: '收款流水号',
  collectMoneyAt: '收款时间',
  authBankCard: '授权银行卡',

  submit: '确定无误提交',
  signUp: '立即注册',
  hasAccountLoginNow: '已经有账号?立即登录',
  goSettings: '去设置',
  getCheckValue: '获取验证码',
  newPassword: '新密码',
  resetPassword: '重置密码',
  passwordModify: '修改密码',
  saveNewPassword: '确定保存新密码',
  oldPassword: '原密码',
  aboutUs: '关于我们',
  signOut: '安全退出',
  feedback: '反馈',
  toScore: '去评分',

  legalPerson: '法人姓名',
  legalPersonPhone: '法人电话',
  legalIdNo: '法人身份证号码',

  agencyCode: '服务商代码',
  merchantNo: '商户号',
  merchantName: '商户名称',
  settleCardNo: '结算银行卡卡号',
  settleReservedPhone: '结算银行卡预留手机号',

  openAliPayFail: '启动支付宝失败',
  openAliPayFailDesc: '请安装最新版本的支付宝',
  openWeChatFail: '启动微信失败',
  openWeChatFailDesc: '请安装最新版本的的微信',

  deniedAccess: '无操作权限',
  deniedAccessLocation: '我们需要知道您的GPS信息以确保您的交易安全,请允许App访问您的GPS信息',

  mandatoryContinueButtonLabel: '立即安装',
  updateProgress: progress => `正在下载更新包${progress}%`,

  loginNameTip: '商户号/法人手机号/用户名',
  loginPasswordTip: '登录密码',
  loginText: '立即登录',
  forgotPassword: '忘记密码?',
  checkValueTip: '短信验证码',

  paymentIng: '正在向银联发起支付请求...',
  loginIng: '正在登录中...',
  registering: '正在注册...',
  updateProfile: '正在更新信息中...',
  modifyPasswordIng: '正在修改密码...'
};

export const title = {
  app: '金管家',
  collectMoney: '请输入收款金额',
  forgotPassword: '忘记密码',
  register: '商家注册',
  registerSecondStep: '商家信息完善',
  user: '我',
  collectMoneyRecord: '收款记录',
  collectMoneyRecordDetail: '收款详情',
  settings: '设置',
  aboutUs: '关于我们',
  modifyPassword: '修改密码'
};

export const errorMsg = {
  checkValueIsEmpty: '请输入您收到的短信验证码',
  loginNameIsEmpty: '请输入您的商户号/法人手机号/用户名',
  loginPasswordIsEmpty: '请输入您的登录密码',
  newLoginPasswordIsEmpty: '新的登录密码不能为空',
  legalPersonIsEmpty: '法人姓名不能为空',
  legalPersonPhoneIsEmpty: '法人电话不能为空',
  legalIdNoIsEmpty: '法人身份证不能为空',
  agencyCodeIsEmpty: '服务商代码不能为空',
  merchantNameIsEmpty: '商户名称不能为空',
  settleCardNoIsEmpty: '结算银行卡不能为空',
  settleCardNoPhoneIsEmpty: '结算银行卡预留手机号不能为空',
  addressIsEmpty: '请选择正确的省、市、县信息',
  streetIsEmpty: '详细地址不能为空',

  legalPersonPhoneError: '法人手机号不正确',
  passwordError: '请输入6-20位密码,不能全数字',
  agencyCodeError: '请输入正确的服务商代码',
  legalIdNoError: '请输入正确的法人身份证号码',
  merchantNo: '请输入正确的商户号'
};

export const resErrMsg = {
  quickPaySubmit: {
    '0000': '提交验证码成功,等待银联返回交易结果',
    '1002': '您输入的短信验证码不正确',
    '3800': '您已已经提交过短信验证码,请耐心等待结果'
  },
  register: {
    '0000': '注册成功,请继续完善您的商家资料',
    '2004': '您填写的服务商代码不存在,请联系您的服务商核对信息'
  },
  resetAdminPassword: {
    '0000': '重置密码成功'
  }
};
