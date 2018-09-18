import Component from 'reactnativecomponents/AbstractComponent';
import { connect } from 'react-redux';
import { Image, ScrollView, Text, View } from 'react-native';
import Dialog from 'reactnativecomponents/Dialog';

import moment from 'moment';

import CollectMoneyStatus, { CollectMoneyStatusText } from 'web-common/constants/CollectMoneyStatus';
import { isQuickPay } from 'web-common/utils/BusinessUtils';
import { BusinessType } from 'web-common/constants/BusinessType';
import Common from 'web-common/constants/Common';

import QrcodeUtils from '../utils/QrcodeUtils';

import { lang, title } from '../locale';

import * as styles from '../styles/CollectMoneyRecordDetail.styles';
import PasswordInput from '../components/PasswordInput';
import Button from '../components/Button';

const BusinessTypeName = {
  [BusinessType.posPay]: lang.mpos,
  [BusinessType.quickPay]: lang.quickPay,
  [BusinessType.quickPaySn]: lang.quickPay,
  [BusinessType.aliPay]: lang.aliPay,
  [BusinessType.aliPayScanQrcodePay]: lang.aliPay,
  [BusinessType.aliPaySwipePay]: lang.aliPay,
  [BusinessType.weChatPay]: lang.weChatPay,
  [BusinessType.weChatScanQrcodePay]: lang.weChatPay,
  [BusinessType.weChatSwipePay]: lang.weChatPay
};

const BtnText = {
  [BusinessType.weChatPay]: lang.saveOrderQrcodeAndOpenWeChat,
  [BusinessType.weChatScanQrcodePay]: lang.saveOrderQrcodeAndOpenWeChat,
  [BusinessType.weChatSwipePay]: lang.waitUserInputPassword,
  [BusinessType.aliPay]: lang.openAlipayToPay,
  [BusinessType.aliPayScanQrcodePay]: lang.openAlipayToPay,
  [BusinessType.aliPaySwipePay]: lang.waitUserInputPassword,
  [BusinessType.quickPay]: lang.submitQuickPayCheckValue
};

/**
 * 订单详情页面
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/3/24
 */
class CollectMoneyRecordDetail extends Component {

  static navigationOptions = {
    headerTitle: title.collectMoneyRecordDetail,
    headerStyle: styles.navHeader
  };

  // refs
  password;

  constructor(props) {
    super(props);
    const {orderId} = this.props.navigation.state.params;
    orderId && actions.cashier.startGetRecord(orderId);
  }

  handleOpen() {
    const {paymentData, businessType, id, auditNumber} = this.props;
    if (businessType === BusinessType.weChatScanQrcodePay) {
      actions.cashier.openWeChatPay({
        paymentData,
        auditNumber
      });
    } else if (businessType === BusinessType.aliPayScanQrcodePay) {
      actions.cashier.openAliPay(paymentData);
    } else if (isQuickPay(businessType)) {
      actions.cashier.startQuickPaySubmit({
        checkValue: this.password.getPassword(),
        orderId: id
      });
    }
  }

  renderOrderItem(title, value) {
    return (
      < View
    style = {styles.item
  }>
  <
    View
    style = {styles.itemTop
  }>
  <
    View
    style = {styles.dot
  }
    />
    < Text
    style = {styles.itemTitle
  }>
    {
      title
    }
  <
    /Text>
    < /View>
    < Text
    numberOfLines = {2}
    style = {styles.itemDesc
  }
  >
    {
      value
    }
  <
    /Text>
    < /View>
  )
    ;
  }

  renderWaitPayment() {
    const {
      businessType,
      paymentData
    } = this.props;
    let tipComp = [];
    switch (businessType) {
      case BusinessType.weChatScanQrcodePay:
      case BusinessType.aliPayScanQrcodePay: {
        const source = {
          uri: QrcodeUtils.getUrl({
            content: paymentData,
            margin: 0
          })
        };
        tipComp.push(
        < View
        key = "0"
        style = {
        {
          alignItems: 'center'
        }
      }
      >
      <
        Image
        source = {source}
        style = {styles.qrcode
      }
        />
        < /View>
      )
        ;
        break;
      }
      default:
        break;
    }
    return tipComp;
  }

  render() {
    const {
      businessType,
      status,
      auditNumber,
      describe,
      actionDate,
      remark,
      totalAmount,
      geOrdering,
      merchant: {
        merchantName
      },
      inQuickPaySubmit
    } = this.props;

    return (
      < View
    style = {styles.container
  }>
  <
    ScrollView
    style = {
    {
      flex: 1
    }
  }>
  <
    View
    style = {styles.header
  }>
  <
    View
    style = {styles.top
  }>
  <
    View
    style = {styles.left
  }>
  <
    Text
    style = {styles.amount
  }>
    {
      `+${totalAmount}`
    }
  <
    /Text>
    < Text
    style = {styles.merchantName
  }>
    {
      merchantName
    }
  <
    /Text>
    < Text
    style = {styles.merchantName
  }>
    {
      CollectMoneyStatusText[status]
    }
  <
    /Text>
    < /View>
    < View
    style = {styles.right
  }>
    {
      status === CollectMoneyStatus.waitPayment && this.renderWaitPayment()
    }
  <
    /View>
    < /View>
    {
      status === CollectMoneyStatus.waitPayment && isQuickPay(businessType) && (
      < View
      style = {styles.passwordContainer
    }>
    <
      PasswordInput
      inputStyle = {
      {
        color: '#FFF'
      }
    }
      ref = {password
    =>
      this.password = password
    }
      secureTextEntry = {false}
      style = {styles.password
    }
      />
      < /View>
    )
    }
  <
    /View>
    < View
    style = {styles.details
  }>
    {
      this.renderOrderItem(lang.collectMoneyAuditNumber, auditNumber)
    }
    {
      this.renderOrderItem(lang.modePayment, businessType.startsWith('QUICK') ? BusinessTypeName[BusinessType.quickPay] : BusinessTypeName[businessType])
    }
    {
      this.renderOrderItem(lang.collectMoneyAt, moment(actionDate.createAt).format(Common.dateTimeFormat))
    }
    {
      this.renderOrderItem(lang.describe, describe)
    }
    {
      this.renderOrderItem(lang.remark, remark)
    }
  <
    /View>
    < /ScrollView>
    {
      status === CollectMoneyStatus.waitPayment && (
      < Button
      containerStyle = {styles.btn
    }
      onPress = {this.handleOpen
    }
      style = {styles.btnContainer
    }
    >
      {
        isQuickPay(businessType) ? BtnText[BusinessType.quickPay] : BtnText[businessType]
      }
    <
      /Button>
    )
    }
  <
    Dialog
    loadingDialog
    visible = {geOrdering}
    />
    < Dialog
    children = {lang.inQuickPaySubmit
  }
    loadingDialog
    visible = {inQuickPaySubmit}
    />
    < /View>
  )
    ;
  }

}

export default connect(({cashier}) => ({
  ...cashier.details,
  inQuickPaySubmit: cashier.inQuickPaySubmit
}))(CollectMoneyRecordDetail);
