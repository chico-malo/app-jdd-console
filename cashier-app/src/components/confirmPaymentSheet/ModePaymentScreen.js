import PropTypes from 'prop-types';
import Component from 'reactnativecomponents/AbstractComponent';
import accounting from 'accounting';

import bankCard from 'web-common/components/svg/bankCard';
import balance from 'web-common/components/svg/balance';
import correct from 'web-common/components/svg/correct';
import ModePayment from 'web-common/constants/ModePayment';
import { bankCardTypeText } from 'web-common/constants/BankCardType';
import { getConfig } from 'web-common/constants/BankConfig';

import { getState } from '../../core/store';

import { lang } from '../../locale';
import { iconColor, main } from '../../styles';

import * as styles from './styles';
import List, { defaultRightArrow } from '../List';
import HeaderCloseButton from './HeaderCloseButton';
import Title from '../Title';

/**
 * 选择支付方式页面
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/10/27
 */
export default class ModePaymentScreen extends Component {

  static navigationOptions = ({screenProps}) => {
    const {initialRouteName, onCancel} = screenProps;
    const options = {
      title: lang.choosePaymentMode,
      headerStyle: styles.header,
      headerTintColor: styles.headerTintColor
    };
    if (initialRouteName === 'ModePayment') {
      options.headerLeft = (
        < HeaderCloseButton
      onPress = {onCancel}
      />
    )
      ;
    }

    return options;
  };

  static contextTypes = {
    destroy: PropTypes.func
  };

  handleItemPress({data}) {
    const {onCancel, onSelectModePayment} = this.props.screenProps;
    if (!data) {
      onCancel && onCancel();
      actions.navigator.navigate('UserNewBankCard');
      return;
    }
    onSelectModePayment && onSelectModePayment(data, this.props);
  }

  pushCards(data, cards: Array) {
    const {selectModePayment} = this.props.screenProps;
    cards.forEach(({id, cardNo, cardType, issuer}) => {
      const {label, icon} = getConfig(issuer);
      const body = `${label}${bankCardTypeText[cardType]}(${cardNo.substring(cardNo.length - 4)})`;
      data.push({
        displayRightArrow: false,
        header: icon({width: 25, height: 25}),
        body,
        footer: selectModePayment.id === id ? correct({fill: main, width: 17, height: 17}) : null,
        data: {
          id,
          type: ModePayment.bankCard,
          body,
          cardType
        }
      });
    });
  }

  render() {
    const {useBalance, useCreditCard, useDebitCard, selectModePayment, totalAmount} = this.props.screenProps;
    const {creditCards, debitCards} = getState().userBankCard;
    const {balance: accountBalance} = getState().userAccount;

    const data = [];

    if (useBalance) {
      data.push({
        disabled: totalAmount > accountBalance,
        header: balance({fill: iconColor.balance, width: 25, height: 25}),
        body: (
        < Title subtitle = {`可用余额${accounting.formatMoney(accountBalance)}元`
      }
      title = {lang.balance
    }
      />
    ),
      footer: selectModePayment.type === ModePayment.balance ? correct({fill: main, width: 17, height: 17}) : null,
        data
    :
      {
        id: 0,
          type
      :
        ModePayment.balance,
          body
      :
        lang.balance
      }
    })
      ;
    }
    if (useCreditCard) {
      this.pushCards(data, creditCards);
    }
    if (useDebitCard) {
      this.pushCards(data, debitCards);
    }

    if (useCreditCard || useDebitCard) {
      data.push({
        rightArrow: defaultRightArrow,
        header: bankCard({fill: iconColor.bankCard, width: 25, height: 25}),
        body: lang.addUserBankCard
      });
    }
    return (
      < List
    bodyTextStyle = {styles.bodyText
  }
    data = {data}
    onItemPress = {this.handleItemPress
  }
    rightArrow = {false}
    />
  )
    ;
  }

}
