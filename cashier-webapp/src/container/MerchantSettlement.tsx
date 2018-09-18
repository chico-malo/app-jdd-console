/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/5/9
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { getActions } from 'common/core/store';
import { errorMsg, lang } from 'common/locale';

import BrandContainer from '../component/BrandContainer';
import { Input } from '../component/Input';
import Button from '../component/Button';
import Repository from 'common/core/Repository';


@connect(({merchant}) => ({
  processing: merchant.processing
}))
export default class RegisterSecondStep extends BrandContainer {
  componentDidMount() {
    this.setAccountName();
  }

  /**
   * 获取操作员名称，set
   * @returns {Promise<void>}
   */
  async setAccountName() {
    const {setValue} = this.form;
    const storage = await Repository.findLoginOperator();
    let operatorName = '**';
    if (storage) {
      operatorName = storage.operator.name;
    }
    setValue({
      accountName: operatorName
    });
  }

  handleSubmit() {
    const errorFields = this.form.validate();
    if (errorFields) {
      console.error(errorFields);
      return;
    }
    const value: any = this.form.getValue();
    // 删除结算名称字段
    Reflect.deleteProperty(value, 'accountName');
    console.log('form is ok', value);
    getActions().merchant.updateSettlement(value);
  }

  renderChildren() {
    const fields = [{
      name: 'accountName',
      label: lang.settleName,
      disabled: true,
      missMsg: errorMsg.settleNameIsEmpty
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
