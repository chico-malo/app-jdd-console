/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/5/9
 */
import * as React from 'react';
import { connect } from 'react-redux';
import Component from 'veigar/AbstractComponent';

import collectMoney from 'web-common/components/svg/collectMoney';
import record from 'web-common/components/svg/record';
import bankCard from 'web-common/components/svg/bankCard';

import { iconColor } from 'common/styles';
import { lang, title } from 'common/locale';
import { getActions } from 'common/core/store';
import Repository from 'common/core/Repository';
import { MerchantStatus } from 'common/constants/MerchantStatus';

import * as styles from '../styles/Home.styles';
import Dialogs from '../component/Dialogs';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import withTheme from '@material-ui/core/styles/withTheme';

interface Props {
  payments?: number;
  theme?: object;
}

interface State {
  open: boolean;
}

@connect(({payments}) => ({
  payments: payments.payments
}))
class Index extends Component<Props, State> {
  constructor(props, content) {
    super(props, content);
    this.state = {
      open: false
    };
  }

  componentWillMount() {
    this.handleQueryPayment();
  }

  async handleQueryPayment() {
    getActions().payments.startQueryPayment();
  }

  /**
   * 首页图标click事件
   * @param value
   * @returns {() => void}
   */
  handleClick(value) {
    if (value.action) {
      value.action();
    } else {
      getActions().navigator.navigate(value.path);
    }
  }

  /**
   * 打开商户注册弹框方法
   */
  handleMerchantRegisterOpen() {
    this.setState({
      open: true
    });
  }

  /**
   * 关闭商户注册弹框方法
   */
  handleMerchantRegisterClose() {
    this.setState({
      open: false
    });
  }

  /**
   * 事件过滤，判断是否是收款click
   * @param value
   * @returns {Promise<any>}
   */
  async handleAnalysis(value) {
    //
    if (value.path === 'CollectMoney') {
      let storage: any = await Repository.findLoginOperator() || {};
      if (storage && storage.token) {
        let merchant = storage.operator.merchant;
        if (merchant.status === MerchantStatus.waitActive) {
          this.handleMerchantRegisterOpen();
          return;
        }
      }
    }
    return this.handleClick(value);
  }

  handleGoToMerchantRegister() {
    getActions().navigator.replace('RegisterSecondStep');
  }

  /**
   * 渲染按钮
   * @param config 配置数组
   * @returns {any}
   */
  renderButton(config) {
    return (
      <Grid container
            justify="space-between"
            style={styles.buttonContainer}
      >
        {
          config.map((value, index) => (
              <Button key={index}
                      onClick={() => this.handleAnalysis(value)}
              >
                <Grid container
                      wrap="nowrap"
                      direction="column"
                      alignItems="center"
                >
                  <p>{value.icon}</p>
                  <p style={styles.buttonLabel}>{value.label}</p>
                </Grid>
              </Button>
            )
          )
        }
      </Grid>
    )
  }

  /**
   * 交易部分
   * @returns {any}
   */
  renderDeal() {
    const {payments, theme} = this.props;
    return (
      <Grid container
            alignItems="center"
            justify="center"
            direction="column"
            style={{
              padding: '12% 0',
              background: theme.palette.primary.main
            }}
      >
        <p style={styles.dealTips}>{'今日收入(元)'}</p>
        <h1 style={styles.dealMoney}>{payments}</h1>
      </Grid>
    );
  }

  render() {
    const {open} = this.state;
    // 功能button配置
    const buttonConfig = [{
      label: lang.collectMoney,
      path: 'CollectMoney',
      icon: collectMoney({fill: iconColor.collectMoney}),
    }, {
      label: lang.collectMoneyRecord,
      path: 'CollectMoneyRecord',
      icon: record({fill: iconColor.record, width: 30, height: 32}),
    }, {
      label: title.bankCard,
      path: 'BankCard',
      icon: bankCard({fill: iconColor.bankCard})
    }];
    // 用户实名注册配置
    const dialogsConfig = {
      isDialog: open,
      onClose: this.handleMerchantRegisterClose,
      title: "温馨提示",
      operation: {
        text: "必须实名注册才能进行收款!",
        handleClose: this.handleMerchantRegisterClose,
        handleConfirm: this.handleGoToMerchantRegister
      }
    };
    return (
      <Grid container
            justify="space-between"
      >
        {this.renderDeal()}
        {this.renderButton(buttonConfig)}
        <Dialogs {...dialogsConfig}/>
      </Grid>
    );
  }
}

export default withTheme()(Index as any)
