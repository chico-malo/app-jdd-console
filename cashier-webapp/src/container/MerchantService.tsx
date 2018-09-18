/**
 * Copyright: Copyright (C) 2022 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2022/5/9
 */
import * as React from 'react';
import { connect } from 'react-redux';
import Component from 'veigar/AbstractComponent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import * as bankStyles from '../styles/bankCard.styles';
import * as merchantStyles from '../styles/merchantService.styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import aliPay from 'web-common/components/svg/aliPay';
import weChatPay from 'web-common/components/svg/weChatPay';
import quickPay from 'web-common/components/svg/quickPay';
import merchantPerson from 'web-common/components/svg/merchantPerson';
import merchantAccount from 'web-common/components/svg/merchantAccount';
import { getActions } from 'common/core/store';
import Repository from 'common/core/Repository';
import { lang } from 'common/locale';
import Grid from '@material-ui/core/Grid';
import withTheme from '@material-ui/core/styles/withTheme';

// 获取交易类型
const businnessType = require('web-common/locales/businnessType.json');

// 金额类型
const rateType = {
  "PERCENTAGE": '%',
  "CAP": '元'
};

interface Props {
  business: Array<object>
}

interface State {
  merchantName: string;
  address: string;
  accountNo: string;
  rateListConfig: Array<any>
}

@connect(({merchant}) => ({
  business: merchant.business
}))
class MerchantService extends Component<Props, State> {
  constructor(props, content) {
    super(props, content);
    this.state = {
      merchantName: '',
      address: '',
      accountNo: '',
      rateListConfig: []
    };
  }

  componentWillMount() {
    getActions().merchant.queryMerchantInfo();
    this.getStorage();
  }

  /**
   * 渲染商户信息list
   * @param list
   * @returns {any}
   */
  renderListItem(list) {
    return list.map((value, index) => (
      <ListItem key={index}
                style={merchantStyles.listItems}
                button
      >
        <Avatar style={merchantStyles.listItemsAvatar}>
          {value.icon}
        </Avatar>
        <Grid container
              direction="column"
        >
          <Grid item>
            <p style={bankStyles.cardLabel}>
              {value.merchantTitle}
            </p>
          </Grid>
          <Grid item>
            <p style={bankStyles.cardType}>
              {value.merchantValue}
            </p>
          </Grid>
        </Grid>
      </ListItem>
    ));
  }

  /**
   * 渲染费率list
   * @param list
   * @returns {any}
   */
  renderRateItem(list) {
    return list.map((value, index) => (
      <ListItem key={index}
                button
                divider
                style={merchantStyles.rateItems}
      >
        <ListItem disableGutters>
          <ListItemIcon style={{marginRight: 0}}>
            {value.icon}
          </ListItemIcon>
          <ListItemText primary={value.title}/>
        </ListItem>
        <Grid container
              justify="space-between"
        >
          <Grid container
                justify="space-between"
          >
            <p>{lang.feeRate}</p>
            <p>{value.valueRate || ''}</p>
          </Grid>
          <Grid container
                justify="space-between"
          >
            <p>{lang.serviceFeeRate}</p>
            <p>{value.valueFee || ''}</p>
          </Grid>
        </Grid>
      </ListItem>
    ));
  }

  /**
   * 获取缓存数据
   * @returns {Promise<void>}
   */
  async getStorage() {
    let storage: any = await Repository.findLoginOperator() || {};
    if (storage && storage.operator && storage.operator.merchant) {
      const {merchant} = storage.operator;
      this.setState({
        merchantName: merchant.merchantName,
        address: `${merchant.address.province || ''}${merchant.address.city || ''}${merchant.address.county || ''}${merchant.address.street || ''}`,
        accountNo: merchant.settlementAccount.accountNo
      });
    }
  }

  render() {
    const {theme, business} = this.props;
    const {merchantName, address, accountNo} = this.state;
    // 渲染商户基本信息配置
    const rateListConfig = [{
      merchantTitle: merchantName,
      merchantValue: address,
      icon: merchantPerson({
        height: 32,
        width: 32,
        fill: theme.palette.primary.main
      })
    }, {
      merchantTitle: '结算账户',
      merchantValue: accountNo,
      icon: merchantAccount({
        height: 32,
        width: 32,
        fill: theme.palette.primary.main
      })
    }];
    // 费率信息默认配置
    const rateConfig: any = [];
    // 数据重组
    business && business.forEach(value => {
      // 默认iconProps
      let iconProps = {
        width: 22,
        height: 22,
        fill: theme.palette.primary.main
      };
      // 默认icon
      let iconType = merchantPerson({...iconProps});
      // 把type转换成string
      let type = `${value.businessType}`;
      // 如果是微信
      if (type.includes('WeChat')) {
        iconType = weChatPay({...iconProps})
      }
      // 如果是快捷
      if (type.includes('QUICK')) {
        iconType = quickPay({...iconProps})
      }
      // 如果是支付宝
      if (type.includes('AliPay')) {
        iconType = aliPay({...iconProps})
      }
      rateConfig.push({
        title: businnessType[value.businessType],
        valueRate: `${value.feeRate || ''}${rateType[value.feeRateType] || ''}`,
        valueFee: `${value.serviceFeeRate || ''}${rateType[value.serviceFeeRateType] || ''}`,
        icon: iconType
      });
    });

    return (
      <React.Fragment>
        <List style={{
          padding: '1vh 0',
          background: theme.palette.primary.main
        }}>
          {this.renderListItem(rateListConfig)}
        </List>
        <List>
          {this.renderRateItem(rateConfig)}
        </List>
      </React.Fragment>
    )
  }
}

export default withTheme()(MerchantService as any)
