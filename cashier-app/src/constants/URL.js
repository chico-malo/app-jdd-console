import config from '../../config';

const {api} = config;

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/19
 */
export default {
  merchant: `${api}/merchants`,
  register: `${api}/merchants/one/first-step`,
  registerSecondStep: `${api}/merchants/one/second-step`,
  payment: `${api}/payments`,
  quickPaySubmit: recordId => `${api}/payments/${recordId}/quick-pay/check-value`,
  config: `${api}/app/configs`,
  businessConfig: `${api}/products/business-configs`,
  session: `${api}/session`,
  modifyPassword: `${api}/operators/password`,
  sms: `${api}/system/sms`
}
