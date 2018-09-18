import Component from 'reactnativecomponents/AbstractComponent';
import { Text, View } from 'react-native';
import Form from 'reactnativecomponents/Form';
import Input from 'reactnativecomponents/Input';
import Dialog from 'reactnativecomponents/Dialog';
import toast from 'reactnativecomponents/toast';

import Pattern from 'web-common/utils/Pattern';

import Button from '../components/Button';
import List from '../components/List';

import { errorMsg, lang, title } from '../locale';

const MissMsg = {
  password: errorMsg.oldPasswordIsEmpty,
  newPassword: errorMsg.newLoginPasswordIsEmpty
};

const ErrorMsg = {
  newPassword: errorMsg.passwordError
};

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/3/29
 */
export default class ModifyPassword extends Component {

  static navigationOptions = {
    headerTitle: title.modifyPassword
  };

  // refs
  form;

  handleSubmit() {
    if (!this.form.isValid()) {
      const fields = this.form.getErrorFields();
      const errMsg = MissMsg[fields.miss[0]] || ErrorMsg[fields.error[0]];
      toast(errMsg);
      return;
    }
    const values = this.form.getFormValue();
    actions.operator.modifyPassword(values);
  }

  renderForm(form) {
    const formInputs = [{
      name: 'password',
      placeholder: lang.oldPassword,
      keyboardAppearance: 'dark'
    }, {
      name: 'newPassword',
      placeholder: lang.newPassword,
      pattern: Pattern.password,
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
    secureTextEntry
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
    style = {styles.form
  }
    />
    < Button
    onPress = {this.handleSubmit
  }
    style = {
    {
      margin: 15
    }
  }
    type = "primary"
      >
      {lang.saveNewPassword
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

