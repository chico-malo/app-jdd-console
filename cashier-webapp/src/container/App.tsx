/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/4/25
 */
import * as React from 'react';
import Component from 'veigar/AbstractComponent';

import Repository from 'common/core/Repository';

import { getActions } from 'common/core/store';

export default class App extends Component<any, any> {

  constructor(props, context) {
    super(props, context);
    getActions().config.loadLocaleConfig();
    getActions().session.loadLoginUser();
  }

  componentWillMount() {
    const {pathname} = this.props.location;
    if (['/Register', '/ForgotPassword', '/Login'].includes(pathname)) {
      return;
    }
    this.checkaOperator();
  }

  /**
   * 校验缓存，判断用户状态
   * @returns {Promise<void>}
   */
  async checkaOperator() {
    const {pathname} = this.props.location;
    let storage: any = await Repository.findLoginOperator() || {};
    console.log('登录用户信息', storage);
    // 判断是否有缓存
    if (storage && storage.token) {
      if (pathname === '/') {
        getActions().navigator.replace('Home');
      }
    } else {
      getActions().navigator.replace('Login');
    }
  }

  render() {
    return (
      <div>
        {''}
      </div>
    )
  }
}
