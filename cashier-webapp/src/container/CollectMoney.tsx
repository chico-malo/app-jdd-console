import * as React from 'react';
import AbstractComponent from 'veigar/AbstractComponent';
import { connect } from 'react-redux';

import LoadingDialog from 'veigar/Dialog';
import { bankCardTypeText } from 'web-common/constants/BankCardType';
import { getConfig } from 'web-common/constants/BankConfig';
import { isQuickPay } from 'web-common/utils/BusinessUtils';
import bankCard from 'web-common/components/svg/bankCard';

import { lang } from 'common/locale/zh-cn';
import { getActions } from 'common/core/store';
import { getPayIcon } from 'common/utils/getPayIcon';
import { Input } from '../component/Input';
import { toast } from '../component/toast';

import * as styles from '../styles/CollectMoney.styles';
import Dialogs from '../component/Dialogs';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';

// import ListSubheader from '@material-ui/core/ListSubheader';

interface CollectFace {
  inputMoney?: string;
  processing: boolean;
  cards?: [any];
  collectMethod?: [any];
}

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/5/5
 */
@connect(({cashier, config, bank}) => ({
  processing: cashier.processing,
  inputMoney: cashier.inputMoney,
  cards: bank.cards,
  collectMethod: config.COLLECT_METHOD || []
}))
export default class CollectMoney extends AbstractComponent<CollectFace> {

  state = {
    open: false,
    businessType: null
  };

  constructor(props, context) {
    super(props, context);
    getActions().position.watch();
  }

  /**
   * 获取银行卡
   */
  componentDidMount() {
    getActions().bank.startQuery();
  }

  componentWillUnmount() {
    getActions().position.clearWatch();
  }


  handleChange({target: {value}}) {
    getActions().cashier.inputMoney(value);
  }

  /**
   * 关闭弹框
   */
  handleDialogClose() {
    this.setState({
      open: false
    });
  }

  /**
   * 发起交易
   * @param businessType
   * @returns {() => Promise<undefined>}
   */
  handlePayment(businessType) {
    return async () => {
      console.log(`businessType -> ${businessType}`);
      const {inputMoney} = this.props;
      if (inputMoney === '') {
        toast('请输入正确的收款金额');
        return;
      }
      if (isQuickPay(businessType)) {
        console.log('快捷收款');
        this.setState({open: true, businessType});
        return;
      }
      await this.startPayment(businessType);
    };
  }

  /**
   * 快捷交易
   * @param bankCardId
   * @returns {() => void}
   */
  handleQuickPayment(bankCardId) {
    return () => {
      this.setState({open: false});
      this.startPayment(this.state.businessType, {bankCardId})
    };
  }

  /**
   * 交易请求
   * @param businessType
   * @param {{}} args
   */
  startPayment(businessType, args = {}) {
    getActions().cashier.startCollectMoney({
      ...args,
      businessType,
      callbackUrl: 'https://merchant.shangfudata.com/cashier/#/CollectMoneyRecordDetail'
    });
  }

  /**
   * 跳转新增银行卡
   */
  goToAddBack() {
    getActions().navigator.navigate({
      routeName: 'BankCardProfile',
      params: {
        isUpdate: false
      }
    });
  }

  /**
   * 渲染收款方式
   * @returns {any}
   */
  renderCollectMethod() {
    const {collectMethod} = this.props;
    return collectMethod.map(({businessType, title, describe}, index) => (
      <ListItem button
                key={index}
                onClick={this.handlePayment(businessType)}
      >
        {getPayIcon(businessType)}
        <ListItemText primary={title}
                      secondary={describe}
        />
      </ListItem>
    ));
  }

  render() {
    const {inputMoney, processing, cards} = this.props;
    const {open} = this.state;
    const InputProps = {
      startAdornment: <InputAdornment position="start">{'￥'}</InputAdornment>,
      endAdornment: <InputAdornment position="end">{lang.yuan}</InputAdornment>
    };
    // 获取银行卡
    let dialogBankCard = () => (
      <List component="nav">
        {cards.map(({id, cardType, cardNo, issuer}: any, index) => {
          // 判断如果这三个字段都等于空，就是后台redux返回的数据
          if (issuer === '' && cardNo === '' && cardType === '') {
            return false;
          }
          const {label, icon} = getConfig(issuer);
          return (
            <ListItem key={index}
                      button
                      onClick={this.handleQuickPayment(id)}
            >
              <ListItemIcon>
                {icon({width: 25, height: 25})}
              </ListItemIcon>
              <ListItemText inset
                            primary={`${label}${bankCardTypeText[cardType]}(${cardNo.substring(cardNo.length - 4)})`}/>
            </ListItem>
          );
        }) || (
          <ListItemText inset primary={'获取银行卡失败!'}/>
        )}
        <ListItem onClick={this.goToAddBack}
                  button
        >
          <ListItemIcon>
            {bankCard({width: 25, height: 25})}
          </ListItemIcon>
          <ListItemText inset
                        primary={'添加银行卡'}
          />
        </ListItem>
      </List>
    );

    return (
      <Grid container
            direction="column"
            style={styles.container}
      >
        <header style={styles.header}>
          <Input InputProps={InputProps}
                 label="收款金额"
                 fullWidth
                 type="number"
                 onChange={this.handleChange}
                 value={inputMoney}
          />
        </header>
        <List component="nav">
          {this.renderCollectMethod()}
        </List>
        <LoadingDialog children={lang.paymentIng}
                       loading
                       visible={processing}
        />
        <Dialogs isDialog={open}
                 onClose={this.handleDialogClose}
                 children={dialogBankCard()}
                 title="请选择付款卡片"
        />
      </Grid>
    );
  }

}
