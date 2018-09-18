import Component from 'reactnativecomponents/AbstractComponent';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Form from 'reactnativecomponents/Form';
import Input from 'reactnativecomponents/Input';
import toast from 'reactnativecomponents/toast';
import Dialog from 'reactnativecomponents/Dialog';

import Button from '../components/Button';
import List from '../components/List';
import Region from '../components/Region';

import { errorMsg, lang, title } from '../locale';
import styles from '../styles/Register.styles';

const missMsg = {
  merchantName: errorMsg.merchantNameIsEmpty,
  accountNo: errorMsg.settleCardNoIsEmpty,
  bankReservedPhone: errorMsg.settleCardNoPhoneIsEmpty,
  street: errorMsg.streetIsEmpty,
  address: errorMsg.addressIsEmpty
};

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/3/2
 */
@connect(({merchant}) => ({
  registering: merchant.processing
}))
export default class RegisterSecondStep extends Component {

  static navigationOptions = {
      headerTitle: (
      < View style = {styles.titleContainer
    } >
    < Text
  style = {[styles.titleText, {
  fontSize: 16
}
]
}>
{
  title.registerSecondStep
}
<
/Text>
< Text
style = {[styles.titleText,
{
  fontSize: 12, marginTop
:
  5
}
]
}>
{
  '您必须完善信息以后才能继续使用'
}
<
/Text>
< /View>
)
}
;

// ref;
form;

handleRegister()
{
  if (!this.form.isValid()) {
    const errFields = this.form.getErrorFields();
    toast(missMsg[errFields.miss[0]]);
    return;
  }
  const form = this.form.getFormValue();
  console.log('form is ok...', form);
  const {province, city, county} = form.address || {};
  if (!province || !city || !county) {
    toast(missMsg.address);
    return;
  }
  form.address.street = form.street;
  actions.merchant.registerSecondStep(form);
}

renderForm(form)
{
  const formInputs = [{
    name: 'merchantName',
    placeholder: `* ${lang.merchantName}`
  }, {
    name: 'accountNo',
    placeholder: `* ${lang.settleCardNo}`
  }, {
    name: 'bankReservedPhone',
    placeholder: `* ${lang.settleReservedPhone}`
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
  formItems.push({
    body: (
    < Region placeholder = "* 省、市、县"
    key = "region"
    name = "address"
    form = {form}
  />
)
},
  {
    body: (
    < Input
    name = "street"
    form = {form}
    placeholder = {`* 详细地址`
  }
    required
    style = {styles.input
  }
    />
  )
  }
)
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

render()
{
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
    {lang.submit
}
<
  /Button>
  < Dialog
  children = {lang.updateProfile
}
  loadingDialog
  visible = {registering}
  />
  < /KeyboardAvoidingView>
)
  ;
}

}
