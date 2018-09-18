import * as React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { errorMsg, lang } from 'common/locale';
import { getActions } from 'common/core/store';

import Button from '../component/Button';
import { Input } from '../component/Input';
import BrandContainer from '../component/BrandContainer';

import * as styles from '../styles/Login.styles';
import Grid from '@material-ui/core/Grid';

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/5/4
 */
@connect(({session}) => ({
  processing: session.processing
}))
export default class Login extends BrandContainer {

  handleSubmit() {
    const errorFields = this.form.validate();
    if (errorFields) {
      console.log(errorFields);
      return;
    }
    console.log(this.form.getValue());
    getActions().session.login(this.form.getValue());
  }

  renderChildren() {

    const buttonProps = {
      fullWidth: false,
      variant: 'flat',
      style: {}
    };
    // 忘记密码路由跳转
    const forgotPasswordProps: any = {
      to: 'ForgotPassword',
      component: Link,
      ...buttonProps
    };

    const signUpProps: any = {
      to: 'Register',
      component: Link,
      ...buttonProps
    };
    // 表单配置文件
    const fields = [{
      label: lang.loginNameTip,
      name: 'loginName',
      missMsg: errorMsg.loginNameIsEmpty
    }, {
      label: lang.loginPasswordTip,
      name: 'password',
      missMsg: errorMsg.loginPasswordIsEmpty,
      type: 'password'
    }];

    const children = fields.map((field, index) => (
      <Input {...field}
             key={index}
             fullWidth
             required
      />
    ));

    children.push(
      <Button loading={this.props.processing}
              onClick={this.handleSubmit}
              style={styles.loginBtn}
              key="submit"
      >
        {lang.loginText}
      </Button>,
      <Grid container
            justify="space-between"
            key="link"
      >
        <Button {...forgotPasswordProps}>
          {lang.forgotPassword}
        </Button>
        <Button {...signUpProps}>
          {lang.signUp}
        </Button>
      </Grid>
    );

    return children;
  }

};
