import Component from 'reactnativecomponents/AbstractComponent';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { connect } from 'react-redux';
import Form from 'reactnativecomponents/Form';
import Input from 'reactnativecomponents/Input';
import toast from 'reactnativecomponents/toast';
import Dialog from 'reactnativecomponents/Dialog';

import Pattern from 'web-common/utils/Pattern';

import Button from '../components/Button';
import List from '../components/List';

import SmsType from '../constants/SmsType';

import { errorMsg, lang, title } from '../locale';
import { main } from '../styles';
import CheckValueButton from '../components/CheckValueButton';

const missMsg = {
  legalPerson: errorMsg.legalPersonIsEmpty,
  legalPersonPhone: errorMsg.legalPersonPhoneIsEmpty,
  legalIdNo: errorMsg.legalIdNoIsEmpty,
  password: errorMsg.loginPasswordIsEmpty,
  checkValue: errorMsg.checkValueIsEmpty,
  agencyCode: errorMsg.agencyCodeIsEmpty
};

const errMsg = {
  legalPersonPhone: errorMsg.legalPersonPhoneError,
  password: errorMsg.passwordError,
  checkValue: errorMsg.checkValueIsEmpty
};

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/3/2
 */
@connect(({sms}) => ({
  countdown: sms.countdown
}))
export default class Register extends Component {

  static navigationOptions = {
    headerTitle: title.register
  };

  // ref;
  form;

  handleGetCheckValue() {
    const {legalPersonPhone, agencyCode, legalIdNo} = this.form.getFormValue();
    if (!agencyCode) {
      toast(errorMsg.agencyCodeError);
      return;
    }
    if (!legalIdNo) {
      toast(errorMsg.legalIdNoError);
      return;
    }

    if (legalPersonPhone && legalPersonPhone.length === 11) {
      actions.sms.sendSms({
        type: SmsType.REGISTER,
        phoneNo: legalPersonPhone,
        agencyCode,
        legalIdNo
      });
    } else {
      toast(errorMsg.legalPersonPhoneError);
    }
  }

  handleRegister() {
    if (!this.form.isValid()) {
      const errFields = this.form.getErrorFields();
      toast(missMsg[errFields.miss[0]] || errMsg[errFields.error[0]]);
      return;
    }
    const form = this.form.getFormValue();
    console.log('form is ok...', form);
    actions.merchant.register(form);
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
      keyboardType: Platform.OS === 'ios' ? 'number-pad' : 'numeric',
      name: 'agencyCode',
      placeholder: `* ${lang.agencyCode}`
    }, {
      name: 'legalPerson',
      placeholder: `* ${lang.legalPerson}`,
      pattern: Pattern.chineseName
    }, {
      name: 'legalPersonPhone',
      keyboardType: Platform.OS === 'ios' ? 'number-pad' : 'numeric',
      placeholder: `* ${lang.legalPersonPhone}`,
    }, {
      name: 'legalIdNo',
      placeholder: `* ${lang.legalIdNo}`
    }, {
      name: 'password',
      placeholder: `* ${lang.loginPasswordTip}`,
      pattern: Pattern.password,
      secureTextEntry: true,
      keyboardAppearance: 'dark'
    }, {
      after: sendCheckValueBtn,
      keyboardType: Platform.OS === 'ios' ? 'number-pad' : 'numeric',
      maxLength: 6,
      name: 'checkValue',
      placeholder: `* ${lang.checkValueTip}`
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
    const {registering} = this.props;

    return (
      < KeyboardAvoidingView
    keyboardVerticalOffset = {140}
    behavior = "padding"
    enabled
    style = {styles.container
  }
  >
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
    containerStyle = {styles.submit
  }
    disabled = {registering}
    onPress = {this.handleRegister
  }
    type = "primary"
      >
      {lang.signUp
  }
  <
    /Button>
    < Button
    onPress = {actions.navigator.back
  }
    textStyle = {
    {
      color: main
    }
  }
    type = "link"
      >
      {lang.hasAccountLoginNow
  }
  <
    /Button>
    < Dialog
    children = {lang.registering
  }
    loadingDialog
    visible = {registering}
    />
    < /KeyboardAvoidingView>
  )
    ;
  }

}
