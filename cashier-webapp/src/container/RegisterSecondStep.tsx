import * as React from 'react';
import { connect } from 'react-redux';
import { getActions } from 'common/core/store';
import { errorMsg, lang } from 'common/locale';
import Pattern from 'web-common/utils/Pattern';

import BrandContainer from '../component/BrandContainer';
import { Input } from '../component/Input';
import Button from '../component/Button';
import Region from '../component/Region';

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/5/4
 */
@connect(({merchant}) => ({
  processing: merchant.processing
}))
export default class RegisterSecondStep extends BrandContainer {

  handleSubmit() {
    const errorFields = this.form.validate();
    if (errorFields) {
      console.error(errorFields);
      return;
    }
    const value: any = this.form.getValue();
    value.address.street = value.street;
    console.log('form is ok', value);
    getActions().merchant.registerSecondStep(value);
  }

  renderChildren() {
    const fields = [{
      name: 'merchantName',
      label: lang.merchantName,
      pattern: Pattern.chineseName,
      missMsg: errorMsg.merchantNameIsEmpty
    }, {
      name: 'accountNo',
      label: lang.settleCardNo,
      missMsg: errorMsg.settleCardNoIsEmpty,
    }, {
      name: 'bankReservedPhone',
      label: lang.settleReservedPhone,
      missMsg: errorMsg.settleCardNoPhoneIsEmpty
    }];

    const children = fields.map((field, index) => (
      <Input {...field}
             fullWidth
             required
             key={index}
      />
    ));
    children.push(
      <Region key="region"
              name="address"
              fullWidth
      />
    );
    children.push(
      <Input fullWidth
             required
             label="详细地址"
             missMsg="详细地址不能为空"
             name="street"
             key="street"
      />
    );

    children.push(
      <Button loading={this.props.processing}
              key="submit"
              onClick={this.handleSubmit}
      >
        {lang.submit}
      </Button>
    );

    return children;
  }

}
