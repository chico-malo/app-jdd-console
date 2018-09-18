import Component from 'reactnativecomponents/AbstractComponent';
import { connect } from 'react-redux';
import { Platform } from 'react-native';
import Form from 'reactnativecomponents/Form';
import Input from 'reactnativecomponents/Input';
import toast from 'reactnativecomponents/toast';
import Dialog from 'reactnativecomponents/Dialog';

import Button from '../components/Button';
import List from '../components/List';
import styles from '../styles/Login.styles';
import { errorMsg, lang } from '../locale';
import BrandContainer from '../components/BrandContainer';

const errMsg = {
  loginName: errorMsg.loginNameIsEmpty,
  password: errorMsg.loginPasswordIsEmpty
};

/**
 * @author Sean(sean.snow@live.com)
 * @date 2017/2/28
 */
@connect(({session}) => ({
  processing: session.processing
}))
class Login extends Component {

  // ref
  form;

  handleForgotPassword() {
    actions.navigator.navigate('ForgotPassword');
  }

  handleLogin() {
    if (!this.form.isValid()) {
      toast(errMsg[this.form.getErrorFields().miss[0]]);
      return;
    }
    console.log('form is ok...');
    const form = this.form.getFormValue();
    actions.session.login(form);
  }

  goRegister() {
    actions.navigator.navigate('Register');
  }

  renderChildren(form) {
    const iconProps = {
      size: 18,
      color: '#d9d9d9'
    };

    const formInputs = [{
      keyboardType: Platform.OS === 'ios' ? 'number-pad' : 'numeric',
      name: 'loginName',
      placeholder: lang.loginNameTip,
      clearButtonMode: 'while-editing',
      dataDetectorTypes: 'phoneNumber'
    }, {
      name: 'password',
      placeholder: lang.loginPasswordTip,
      secureTextEntry: true,
      onSubmitEditing: this.handleLogin,
      returnKeyType: 'join',
      returnKeyLabel: lang.login,
      keyboardAppearance: 'dark'
    }];
    const formItems = formInputs.map(input => ({
      disabled: true,
      body: (
      < Input
    {...
      input
    }
    form = {form}
    iconProps = {iconProps}
    iconStyle = {
    {
      width: 40
    }
  }
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
    fullSeparator
    rightArrow = {false}
    />
  )
    ;
  }

  render() {
    const {processing} = this.props;

    return (
      < BrandContainer
    style = {styles.container
  }>
  <
    Form
    ref = {form
  =>
    this.form = form
  }
    renderChildren = {this.renderChildren
  }
    />
    < Button
    containerStyle = {styles.forgotPassword
  }
    onPress = {this.handleForgotPassword
  }
    textStyle = {
    {
      color: '#1a99d9'
    }
  }
    type = "link"
      >
      {lang.forgotPassword
  }
  <
    /Button>
    < Button
    autoDismissKeyboard
    containerStyle = {[styles.btn, styles.loginBtn
  ]
  }
    disabled = {processing}
    onPress = {this.handleLogin
  }
    type = "primary"
      >
      {lang.loginText
  }
  <
    /Button>
    < Button
    containerStyle = {[styles.btn]}
    onPress = {this.goRegister
  }
    textStyle = {
    {
      color: '#1a99d9'
    }
  }
    type = "link"
      >
      {'没有账号?'}
      < /Button>
      < Dialog
    children = {lang.loginIng
  }
    loadingDialog
    visible = {processing}
    />
    < /BrandContainer>
  )
    ;
  }

}

export default Login;
