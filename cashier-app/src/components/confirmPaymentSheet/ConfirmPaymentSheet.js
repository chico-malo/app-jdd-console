import PropTypes from 'prop-types';
import { View } from 'react-native';
import Component from 'reactnativecomponents/AbstractComponent';
import { StackNavigator } from 'react-navigation';
import Dialog from 'reactnativecomponents/Dialog';

import { bankCardTypeText } from 'web-common/constants/BankCardType';
import { getConfig } from 'web-common/constants/BankConfig';
import ModePayment from 'web-common/constants/ModePayment';

import { getState } from '../../core/store';

import { lang } from '../../locale';

import DetailScreen from './DetailScreen';
import ModePaymentScreen from './ModePaymentScreen';

/**
 * 确认支付页面主容器
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/8/22
 */
export default class ConfirmPaymentSheet extends Component {

  static propTypes = {
    /**
     * 初始化页面
     */
    initialRouteName: PropTypes.string,
    /**
     * 使用余额
     */
    useBalance: PropTypes.bool,
    /**
     * 使用信用卡
     */
    useCreditCard: PropTypes.bool,
    /**
     * 使用借记卡
     */
    useDebitCard: PropTypes.bool
  };

  static contextTypes = {
    destroy: PropTypes.func
  };

  static defaultProps = {
    initialRouteName: 'Detail',
    useBalance: true,
    useCreditCard: false,
    useDebitCard: false
  };

  state = {
    visible: false,
    selectModePayment: {}
  };

  constructor(props) {
    super(props);
    const {defaultModePayment, useBalance, useCreditCard, useDebitCard, initialRouteName} = props;
    const {creditCards, debitCards} = getState().userBankCard;
    this.state.selectModePayment = defaultModePayment;
    if (!defaultModePayment) {
      if (useBalance) {
        this.state.selectModePayment = {
          id: 0,
          type: ModePayment.balance,
          body: lang.balance
        };
      } else if (useCreditCard || useDebitCard) {
        this.state.selectModePayment = this.getModePayment(creditCards);
      } else if (useDebitCard) {
        this.state.selectModePayment = this.getModePayment(debitCards);
      }
    }
    this.ModalStack = StackNavigator({
      Detail: {
        screen: DetailScreen
      },
      ModePayment: {
        screen: ModePaymentScreen
      }
    }, {
      initialRouteName
    });
  }

  getModePayment(cards = []) {
    const {id, issuer, cardType, cardNo} = cards[0] || {};
    if (!id) {
      return null;
    }
    const body = `${getConfig(issuer).label}${bankCardTypeText[cardType]}(${cardNo.substring(cardNo.length - 4)})`;
    return {
      id,
      type: ModePayment.bankCard,
      body
    };
  }

  handleCancel() {
    const {onCancel} = this.props;
    onCancel && onCancel();
    this.context.destroy();
  }

  handleSelectModePayment(selectModePayment, props) {
    const {onSelectModePayment} = this.props;
    if (onSelectModePayment) {
      onSelectModePayment(selectModePayment, props);
    } else {
      this.setState({selectModePayment});
      props.navigation.goBack();
    }
  }

  switchDialog() {
    this.setState({
      visible: !this.state.visible
    });
  }

  handlePayment(args) {
    const {onPayment} = this.props;
    onPayment && onPayment({
      ...args,
      manager: {
        switchDialog: this.switchDialog,
        cancel: this.handleCancel
      }
    });
  }

  render() {

    const screenProps = {
      ...this.props,
      selectModePayment: this.state.selectModePayment,
      onCancel: this.handleCancel,
      onSelectModePayment: this.handleSelectModePayment,
      onPayment: this.handlePayment
    };

    return (
      < View
    style = {
    {
      flex: 1
    }
  }>
  <
    this.ModalStack
    screenProps = {screenProps}
    />
    < Dialog
    children = {lang.paymentIng
  }
    loadingDialog
    visible = {this.state.visible
  }
    />
    < /View>
  )
    ;
  }
}
