import ConfirmPaymentSheet from './ConfirmPaymentSheet';
import actionSheet from '../actionSheet';

type
Props = {
  /**
   * 是否可使用信用卡
   */
  useCreditCard: boolean,
  /**
   * 是否可使用借记卡
   */
  useDebitCard: boolean,
  /**
   * 是否可以使用余额支付
   */
  useBalance: boolean,
  /**
   * 默认支付方式
   */
  defaultModePayment: any,
  /**
   * 交易金额
   */
  totalAmount: String,
  /**
   * 订单类型
   */
  orderType: String,
  /**
   * 当选择支付信息时回调函数
   */
  onSelectModePayment: Function,

  /**
   * 当点击立即支付时回调函数
   * args: {
   * modePayment: 支付方式,
   * paymentData: 支付数据，一般为银行卡id,
   * manager: {
   *  cancel: 关闭弹出框
   * }
   * }
   */
  onPayment: Function
}

export default (props: Props) => actionSheet({
  content: < ConfirmPaymentSheet
{...
  props
}
/>,
onDismiss: () => true,
})
;
