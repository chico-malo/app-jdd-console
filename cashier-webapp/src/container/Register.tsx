import * as React from 'react';
import { connect } from 'react-redux';
import Pattern from 'web-common/utils/Pattern';

import { errorMsg, lang } from 'common/locale';
import { getActions } from 'common/core/store';
import { SmsType } from 'common/constants/SmsType';

import Button from '../component/Button';
import CheckValueButton from '../component/CheckValueButton';
import { toast } from '../component/toast';
import { Input } from '../component/Input';
import BrandContainer from '../component/BrandContainer';
import HttpUtils from 'web-common/utils/HttpUtil';

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/5/4
 */
@connect(({merchant}) => ({
  processing: merchant.processing
}))
export default class Register extends BrandContainer {

  handleSubmit() {
    const errorFields = this.form.validate();
    if (errorFields) {
      console.error(errorFields);
      return;
    }
    // 获取agencyCode
    const {agencyCode} = HttpUtils.getQueryArgs();
    const value = this.form.getValue();
    // 创建副本
    let newValue = Object.assign(value);
    // 如果存在需要手动添加
    if (agencyCode) {
      newValue.agencyCode = agencyCode;
    }
    console.log('form is ok', newValue);
    getActions().merchant.register(newValue);
  }

  sendSms() {
    const {legalPersonPhone, agencyCode, legalIdNo}: any = this.form.getValue();
    if (!agencyCode) {
      toast(errorMsg.agencyCodeError);
      return;
    }
    if (!legalIdNo) {
      toast(errorMsg.legalIdNoError);
      return;
    }

    if (legalPersonPhone && legalPersonPhone.length === 11) {
      getActions().sms.sendSms({
        type: SmsType.REGISTER,
        phoneNo: legalPersonPhone,
        agencyCode,
        legalIdNo,
        prefix: 'register'
      });
    } else {
      toast(errorMsg.legalPersonPhoneError);
    }
  }

  renderChildren() {
    // 获取url agencyCode
    const {agencyCode} = HttpUtils.getQueryArgs();
    let fields: any = [{
      name: 'legalPerson',
      label: lang.legalPerson,
      pattern: Pattern.chineseName,
      missMsg: errorMsg.legalPersonIsEmpty,
      mismatchMsg: errorMsg.legalPersonError
    }, {
      name: 'legalPersonPhone',
      label: lang.legalPersonPhone,
      missMsg: errorMsg.legalPersonPhoneIsEmpty
    }, {
      name: 'legalIdNo',
      label: lang.legalIdNo,
      missMsg: errorMsg.legalIdNoError
    }, {
      name: 'password',
      label: lang.loginPasswordTip,
      pattern: Pattern.password,
      type: 'password',
      mismatchMsg: errorMsg.passwordError
    }, {
      InputProps: {
        endAdornment: (
          <CheckValueButton onClick={this.sendSms}/>
        )
      },
      maxLength: 4,
      name: 'checkValue',
      label: lang.checkValueTip,
      missMsg: errorMsg.checkValueIsEmpty
    }];
    // 判断如果不存在，添加agencyCode表单
    if (!agencyCode) {
      fields.unshift({
        name: 'agencyCode',
        label: lang.agencyCode,
        missMsg: errorMsg.agencyCodeIsEmpty
      });
    }
    const children = fields.map((input, index) => (
      <Input {...input}
             fullWidth
             required
             key={index}
      />
    ));

    children.push(
      <Button loading={this.props.processing}
              key="submit"
              onClick={this.handleSubmit}
      >
        {lang.signUp}
      </Button>
    );

    return children;
  }

}
