import * as React from 'react';
import { connect } from 'react-redux';
import { getActions } from 'common/core/store';
import { SmsType } from 'common/constants/SmsType';
import { errorMsg, lang } from 'common/locale';

import Button from '../component/Button';
import { Input } from '../component/Input';
import { toast } from '../component/toast';
import BrandContainer from '../component/BrandContainer';
import CheckValueButton from '../component/CheckValueButton';

import * as styles from '../styles/ForgotPassword.styles';


/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/5/4
 */
@connect(({merchant}) => ({
  processing: merchant.processing
}))
export default class ForgotPassword extends BrandContainer {

  handleSubmit() {
    const errorFields = this.form.validate();
    if (errorFields) {
      console.error(errorFields);
      return;
    }
    const value = this.form.getValue();
    console.log('form is ok', value);
    getActions().merchant.resetAdminPassword(value);
  }

  sendSms() {
    const {merchantNo}: any = this.form.getValue();
    if (merchantNo === '') {
      toast(errorMsg.merchantNo);
      return;
    }
    getActions().sms.sendSms({
      type: SmsType.RESET_PASSWORD,
      merchantNo
    });
  }

  renderChildren() {
    const {processing} = this.props;
    const fields = [{
      name: 'merchantNo',
      label: lang.merchantNo,
      missMsg: errorMsg.merchantNameIsEmpty
    }, {
      name: 'checkValue',
      label: lang.checkValueTip,
      missMsg: errorMsg.checkValueIsEmpty,
      InputProps: {
        endAdornment: (
          <CheckValueButton onClick={this.sendSms}/>
        )
      }
    }, {
      name: 'password',
      label: lang.newPassword,
      type: 'password',
      missMsg: errorMsg.newLoginPasswordIsEmpty
    }];
    const children = fields.map((input, index) => (
      <Input {...input}
             fullWidth
             required
             key={index}
      />
    ));

    children.push(
      <Button onClick={this.handleSubmit}
              loading={processing}
              style={styles.submitBtn}
              key="submit"
      >
        {lang.resetPassword}
      </Button>
    );
    return children;
  }

}
