import Component from 'reactnativecomponents/AbstractComponent';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Form from 'reactnativecomponents/Form';
import Input from 'reactnativecomponents/Input';
import Dialog from 'reactnativecomponents/Dialog';
import toast from 'reactnativecomponents/toast';

import Button from '../components/Button';
import List from '../components/List';
import CheckValueButton from '../components/CheckValueButton';

import { errorMsg, lang, title } from '../locale';
import SmsType from '../constants/SmsType';

const errMsg = {
  merchantNo: errorMsg.merchantNo,
  password: errorMsg.newLoginPasswordIsEmpty,
  checkValue: errorMsg.checkValueIsEmpty
};

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/3/1
 */
@connect(({sms, merchant}) => ({
  countdown: sms.countdown,
  processing: merchant.processing
}))
export default class ForgotPassword extends Component {

  static navigationOptions = {
    headerTitle: title.forgotPassword
  };

  // refs
  form;

  handleGetCheckValue() {
    const {merchantNo} = this.form.getFormValue();
    if (merchantNo) {
      actions.sms.sendSms({
        type: SmsType.RESET_PASSWORD,
        merchantNo
      });
    } else {
      toast(errorMsg.merchantNo);
    }
  }


  handleResetPassword() {
    console.log('重置密码');
    if (!this.form.isValid()) {
      toast(errMsg[this.form.getErrorFields().miss[0]]);
      return;
    }
    const form = this.form.getFormValue();
    actions.merchant.resetAdminPassword(form);
  }

  renderForm(form) {
    const sendCheckValueBtn = (
      < CheckValueButton
    onPress = {this.handleGetCheckValue
  }
    />
  )
    ;

    const formInputs = [{
      autoFocus: true,
      keyboardType: 'numeric',
      name: 'merchantNo',
      placeholder: lang.merchantNo
    }, {
      after: sendCheckValueBtn,
      keyboardType: 'numeric',
      name: 'checkValue',
      placeholder: lang.checkValueTip,
    }, {
      name: 'password',
      placeholder: lang.newPassword,
      secureTextEntry: true,
      keyboardAppearance: 'dark'
    }];

    const formItems = formInputs.map(input => ({
      body: (
      < Input
    {...
      input
    }
    form = {form}
    required
    style = {styles.input
  }
    />
  )
  }))
    ;
    return (
      < List
    data = {formItems}
    disabled
    fullSeparator
    rightArrow = {false}
    />
  )
    ;
  }

  render() {
    const {processing} = this.props;
    return (
      < View
    style = {styles.container
  }>
  <
    Form
    ref = {form
  =>
    this.form = form
  }
    renderChildren = {this.renderForm
  }
    />
    < Button
    containerStyle = {styles.btn
  }
    onPress = {this.handleResetPassword
  }
    type = "primary"
      >
      {lang.resetPassword
  }
  <
    /Button>
    < Dialog
    children = {lang.modifyPasswordIng
  }
    loadingDialog
    visible = {processing}
    />
    < /View>
  )
    ;
  }
}
