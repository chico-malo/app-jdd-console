/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/5/4
 */
import * as React from 'react';
import { connect } from 'react-redux';

import { getActions } from 'common/core/store';
import Button from '../component/Button';
import BrandContainer from '../component/BrandContainer';
import { errorMsg, lang, title } from 'common/locale';
import { Input } from '../component/Input';

@connect(({bank}) => ({
  processing: bank.processing
}))
export default class BankCardProfile extends BrandContainer {
  componentDidMount() {
    const {params} = this.props;
    const {setValue} = this.form;
    if (params && params.isUpdate) {
      // 编辑状态修改title
      document.title = title.bankCardUpdate;
      const {card} = params;
      let bankForm = {
        cardNo: card.cardNo,
        expireDate: card.expireDate,
        cvv: card.cvv,
        reservedPhone: card.reservedPhone,
      };
      setValue(bankForm);
    }
  }

  /**
   * 提交事件
   */
  handleSubmit() {
    const errorFields = this.form.validate();
    const {params = {}} = this.props;
    if (errorFields) {
      console.error(errorFields);
      return;
    }
    let isUpdate = params && params.isUpdate;
    const value: any = this.form.getValue();
    // 新增value副本
    let newValue = Object.assign(value, {
      id: (params.card || {}).id,
      isUpdate: isUpdate,
      cardNo: value.cardNo
    });
    // 编辑
    console.log('form is ok', newValue);
    getActions().bank.startUpdateCard(newValue);
  }

  renderChildren() {
    const {processing, params} = this.props;
    // 判断是否是编辑状态，判断卡号禁用，修改input type展示带字符串
    let isUpdate = params && params.isUpdate;
    // 表单配置
    const fields: Array<any> = [{
      name: 'cardNo',
      label: lang.cardNo,
      disabled: isUpdate,
      type: isUpdate && 'text' || 'number',
      missMsg: errorMsg.cardNo
    }, {
      name: 'expireDate',
      type: 'text',
      placeholder: '示例:18年5月,输入0518',
      label: lang.expireDate,
      missMsg: errorMsg.expireDate,
      InputLabelProps: {shrink: true}
    }, {
      name: 'cvv',
      label: lang.cvv,
      type: 'number',
      missMsg: errorMsg.cvv
    }, {
      name: 'reservedPhone',
      label: lang.reservedPhone,
      type: 'number',
      missMsg: errorMsg.reservedPhone
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
              key="submit"
              fullWidth
      >
        {isUpdate && lang.edit || lang.add}
      </Button>
    );
    return children;
  }
}
