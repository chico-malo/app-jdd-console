import { lang } from '../locale';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/3/27
 */
const CollectMoneyStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  processing: 'PROCESSING',
  waitPayment: 'WAIT_PAYMENT',
  cancelled: 'CANCELLED'
};

const CollectMoneyStatusText = {
  [CollectMoneyStatus.success]: lang.collectMoneySuccess,
  [CollectMoneyStatus.processing]: lang.processing,
  [CollectMoneyStatus.waitPayment]: lang.waitPayment,
  [CollectMoneyStatus.cancelled]: lang.cancelled,
  [CollectMoneyStatus.failure]: lang.failure
};

export {
  CollectMoneyStatus as default,
  CollectMoneyStatusText
};
