import * as React from 'react';
import AbstractComponent from 'veigar/AbstractComponent';
import { connect } from 'react-redux';
import * as moment from 'moment';
import LoadingDialog from 'veigar/Dialog';

import Common from 'web-common/constants/Common';
import { isAliPay, isQuickPay, isWeChatPay } from 'web-common/utils/BusinessUtils';
import { BusinessType } from 'web-common/constants/BusinessType';

import CollectMoneyStatus, { CollectMoneyStatusText } from 'common/constants/CollectMoneyStatus';
import { lang } from 'common/locale';
import { getActions } from 'common/core/store';
import QrcodeUtils from 'common/utils/QrcodeUtils';

import * as styles from '../styles/CollectMoneyRecordDetail.styles';
import PasswordInput from '../component/PasswordInput';
import { toast } from '../component/toast';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import withTheme from '@material-ui/core/styles/withTheme';

@connect(({cashier}) => ({
  ...cashier.details,
  inQuickPaySubmit: cashier.inQuickPaySubmit
}))
class CollectMoneyRecordDetail extends AbstractComponent {

  password: any;

  componentWillMount() {
    const {params} = this.props;
    if (params) {
      getActions().cashier.startGetRecord(params);
    } else {
      toast('获取订单详情失败');
    }
  }

  async handleTextChange(value) {
    if (value.length === 6) {
      (document.activeElement as any).blur();
      getActions().cashier.startQuickPaySubmit({
        checkValue: this.password.getPassword(),
        orderId: this.props.params
      });
    }
  }

  /**
   * 渲染 收款信息
   * @param label
   * @param value
   * @returns {any}
   */
  renderItem(label, value) {
    return (
      <ListItem disableGutters>
        <Grid container
              justify="space-between"
              alignItems="center"
        >
          <p style={styles.itemLabel}>{label}</p>
          <p style={styles.itemValue}>{value || '-'}</p>
        </Grid>
      </ListItem>
    );
  }

  renderWaitPayment() {
    const {
      businessType,
      paymentData
    } = this.props;
    let tipComp: Array<any> = [];
    switch (businessType) {
      case BusinessType.weChatScanQrcodePay:
      case BusinessType.aliPayScanQrcodePay: {
        const source = QrcodeUtils.getUrl({
          content: paymentData,
          margin: 0
        });
        tipComp.push(
          <div key="0"
               style={{alignItems: 'center'}}
          >
            <img src={source}
                 style={styles.qrcode}
            />
          </div>
        );
        break;
      }
      default:
        break;
    }
    return tipComp;
  }

  render() {
    const {
      businessType,
      status,
      auditNumber,
      describe,
      actionDate,
      remark,
      totalAmount,
      merchant: {
        merchantName
      },
      inQuickPaySubmit,
      theme
    } = this.props;

    let paymentType = '';
    if (isQuickPay(businessType)) {
      paymentType = lang.quickPay;
    } else if (isAliPay(businessType)) {
      paymentType = lang.aliPay;
    } else if (isWeChatPay(businessType)) {
      paymentType = lang.weChatPay;
    }

    return (
      <Grid container
            direction="column"
            style={styles.container}
      >
        <header style={{
          paddingTop: theme.spacing.unit * 5,
          paddingBottom: theme.spacing.unit * 5,
          background: theme.palette.primary.main
        }}>
          <div style={styles.top}>
            <div style={styles.left}>
              <span style={styles.amount}>{`+${totalAmount}`}</span>
              <span style={styles.merchantName}>
                {merchantName}
              </span>
              <span style={styles.merchantName}>
                {CollectMoneyStatusText[status]}
              </span>
            </div>
            <div style={styles.right}>
              {status === CollectMoneyStatus.waitPayment && this.renderWaitPayment()}
            </div>
          </div>
          {status === CollectMoneyStatus.waitPayment && isQuickPay(businessType) && (
            <PasswordInput ref={password => this.password = password}
                           onTextChange={this.handleTextChange}
            />
          )}
        </header>
        <Grid container
              style={styles.content}
        >
          {this.renderItem(lang.collectMoneyAuditNumber, auditNumber)}
          {this.renderItem(lang.paymentType, paymentType)}
          {this.renderItem(lang.createAt, moment(actionDate.createAt).format(Common.dateTimeFormat))}
          <Divider light
                   component="p"
                   style={{
                     width: '100%'
                   }}
          />
          {this.renderItem(lang.describe, describe)}
          {this.renderItem(lang.remark, remark)}
        </Grid>
        <LoadingDialog children={lang.paymentIng}
                       loading
                       visible={inQuickPaySubmit}
        />
      </Grid>
    );
  }
}

export default withTheme()(CollectMoneyRecordDetail as any)
