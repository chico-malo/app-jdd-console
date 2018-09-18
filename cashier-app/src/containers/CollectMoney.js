import Component from 'reactnativecomponents/AbstractComponent';
import { connect } from 'react-redux';
import { ScrollView, Text, View } from 'react-native';
import Input from 'reactnativecomponents/material-ui/TextField';
import Dialog from 'reactnativecomponents/Dialog';
import toast from 'reactnativecomponents/toast';

import { isAliPay, isQuickPay, isWeChatPay } from 'web-common/utils/BusinessUtils';
import quickPay from 'web-common/components/svg/quickPay';
import aliPay from 'web-common/components/svg/aliPay';
import weChatPay from 'web-common/components/svg/weChatPay';
import cny from 'web-common/components/svg/cny';
import confirmPaymentSheet from '../components/confirmPaymentSheet';
import List from '../components/List';

import { lang, title } from '../locale';
import * as styles from '../styles/CollectMoney.styles';
import { iconColor } from '../styles';
import Title from '../components/Title';

function getIcon(businessType) {
  let icon = null;
  let color = '#000';
  if (isQuickPay(businessType)) {
    icon = quickPay;
    color = iconColor.quickPay;
  } else if (isAliPay(businessType)) {
    icon = aliPay;
    color = iconColor.aliPay;
  } else if (isWeChatPay(businessType)) {
    icon = weChatPay;
    color = iconColor.weChatPay;
  }
  if (icon) {
    return icon({fill: color, width: 28, height: 28});
  }
  return null;
}

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/3/2
 */
@connect(({cashier, user, config}) => ({
  processing: cashier.processing,
  inputMoney: cashier.inputMoney,
  collectMethod: config.collectMethod
}))
export default class CollectMoney extends Component {

  static navigationOptions = {
    headerTitle: title.collectMoney,
    headerBackTitle: lang.collectMoney,
    headerStyle: styles.header
  };

  componentDidMount() {
    actions.position.watch();
  }

  componentWillUnmount() {
    actions.position.clearWatch();
  }

  handlePayment({businessType}) {
    const {inputMoney} = this.props;
    if (inputMoney === '') {
      toast('请输入正确的收款金额');
      return;
    }
    if (isQuickPay(businessType)) {
      console.log('快捷收款');
      confirmPaymentSheet({
        useCreditCard: true,
        useDebitCard: false,
        useBalance: false,
        totalAmount: inputMoney,
        initialRouteName: 'ModePayment',
        onSelectModePayment: ({id}, {screenProps}) => {
          screenProps.onCancel();
          this.startPayment(businessType, {
            userBankCardId: id
          });
        }
      });
      return;
    }
    this.startPayment(businessType);
  }

  startPayment(businessType, args = {}) {
    const {authCode, businessType: bType} = this.props.navigation.state.params || {};
    actions.cashier.startCollectMoney({
      ...args,
      businessType: bType || businessType,
      authCode
    });
  }

  render() {
    const {inputMoney, processing, navigation, collectMethod} = this.props;

    const {businessType} = navigation.state.params || {};

    console.log('收款方式->', collectMethod);
    if (!collectMethod || collectMethod.length === 0) {
      return
    <
      Text > {'无可用的收款方式,请联系管理员'} < /Text>
    }

    let MODE_PAYMENT;
    if (businessType) {
      const isAliPayBus = isAliPay(businessType);
      const key = isAliPayBus ? 'aliPay' : 'weChatPay';
      MODE_PAYMENT = [{
        header: getIcon(isAliPayBus ? aliPay : weChatPay, iconColor[key]),
        businessType,
        body: (
        < Title title = {lang[key]}/>
    )
    }]
      ;
    } else {
      MODE_PAYMENT = collectMethod.map(({businessType, title, describe}) => ({
        header: getIcon(businessType),
        businessType,
        body: (
        < Title subtitle = {describe}
        title = {title}
      />
    )
    }))
      ;
    }


    const before = (
      < View
    style = {styles.cny
  }>
    {
      cny({fill: '#FFF', width: 23, height: 30})
    }
  <
    /View>
  )
    ;
    const after = (
      < View
    style = {styles.cny
  }>
  <
    Text
    style = {
    {
      color: '#FFF'
    }
  }>
    {
      lang.yuan
    }
  <
    /Text>
    < /View>
  )
    ;
    return (
      < ScrollView
    style = {styles.container
  }>
  <
    View
    style = {styles.amount
  }>
  <
    Input
    after = {after}
    before = {before}
    clearButtonMode = "never"
    inputStyle = {styles.input
  }
    keyboardType = "numeric"
    maxLength = {9}
    onChangeText = {actions.cashier.inputMoney
  }
    selectionColor = "#FFF"
    underlineFocusStyle = {
    {
      backgroundColor: '#FFF'
    }
  }
    underlineStyle = {
    {
      marginTop: 7, height
    :
      1, backgroundColor
    :
      '#FFF'
    }
  }
    value = {inputMoney}
    />
    < /View>
    < List
    containerStyle = {styles.list
  }
    data = {MODE_PAYMENT}
    itemStyle = {styles.listItem
  }
    onItemPress = {this.handlePayment
  }
    />
    < Dialog
    children = {lang.paymentIng
  }
    loadingDialog
    visible = {processing}
    />
    < /ScrollView>
  )
    ;
  }

}
