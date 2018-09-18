/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/6/12
 */
import * as styles from '../styles/merchantBusiness.style';
import * as merchantStyles from '../styles/merchantService.styles';
import * as React from 'react';
import { connect } from 'react-redux';
import Component from 'veigar/AbstractComponent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

import merchant from 'web-common/components/svg/merchant';
import { lang } from 'common/locale';
import { getActions } from 'common/core/store';
import Repository from 'common/core/Repository';
import { isStatus, real } from '../constants/OBJECT';
import Grid from '@material-ui/core/Grid';
import withTheme from '@material-ui/core/styles/withTheme';

export interface Props {
  theme: object;
  merchant: object;
}

export interface State {
  accountName: string;
  legalIdNo: string;
  realFlag: boolean;
  legalIdFrontValid: boolean;
  legalIdReversValid: boolean;
  settleBankCardFrontValid: boolean;
  handheldIdPhotoValid: boolean;
}

@connect(({session}) => ({
  merchant: session.operator.merchant
}))
class MerchantBusiness extends Component<Props, State> {
  constructor(props, content) {
    super(props, content);
    this.state = {
      accountName: 'xx',
      legalIdNo: '****',
      realFlag: false,
      legalIdFrontValid: false,
      legalIdReversValid: false,
      settleBankCardFrontValid: false,
      handheldIdPhotoValid: false
    };
  }

  componentWillMount() {
    this.getStorage();
    getActions().merchant.updateProfile();
  }

  /**
   * 跳转证件提交
   * @param value 路由跳转信息，key title
   */
  handleGoToProfile(value) {
    getActions().navigator.navigate({
      routeName: 'MerchantBusinessProfile',
      params: value
    });
  }

  /**
   * 获取缓存数据
   * @returns {Promise<void>}
   */
  async getStorage() {
    let storage: any = await Repository.findLoginOperator();
    // 判断是否存在缓存
    if (storage && storage.operator && storage.operator.merchant) {
      const {merchant} = storage.operator;
      this.setState({
        accountName: merchant.settlementAccount.accountName,
        legalIdNo: merchant.legalIdNo,
        realFlag: true,
        legalIdFrontValid: merchant.attachment && merchant.attachment.legalIdFrontValid || false,
        legalIdReversValid: merchant.attachment && merchant.attachment.legalIdReversValid || false,
        settleBankCardFrontValid: merchant.attachment && merchant.attachment.settleBankCardFrontValid || false,
        handheldIdPhotoValid: merchant.attachment && merchant.attachment.handheldIdPhotoValid || false
      });
    }
  }

  /**
   * 渲染实名选项
   * @param list
   * @returns {any}
   */
  renderBusinessItem(list) {
    const {theme} = this.props;
    return list.map((value, index) => {
      return (
        <ListItem key={index}
                  button
                  divider
                  onClick={() => this.handleGoToProfile(value)}
        >
          <Grid container
                justify="space-between"
          >
            <Grid container
                  alignItems="center"
                  justify="space-between"
            >
              <Grid item>
                {value.title}
              </Grid>
              <Grid item
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start'
                    }}
              >
                <span style={{
                  color: value.status && 'rgba(177,177,177,1)' || theme.palette.primary.main
                }}>{isStatus[value.status]}</span>
                <KeyboardArrowRight/>
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
      )
    });

  }

  /**
   * 渲染卡片
   * @returns {any}
   */
  renderCard() {
    const {theme} = this.props;
    const {accountName, legalIdNo, realFlag} = this.state;
    return (
      <Card style={{
        background: theme.palette.primary.main,
        ...styles.cardContainer
      }}>
        <CardContent>
          <ListItem button
                    disableGutters
                    style={styles.cardListItem}
          >
            <Avatar style={merchantStyles.listItemsAvatar}>
              {merchant({
                fill: theme.palette.primary.main
              })}
            </Avatar>
            <Grid container
                  direction="column"
            >
              <p>{accountName}</p>
              <p>{legalIdNo}</p>
            </Grid>
          </ListItem>
          <Grid container
                justify="space-between"
          >
            <p>{lang.merchantInformationTip}</p>
            <p>{real[realFlag]}</p>
          </Grid>
        </CardContent>
      </Card>
    )
  }

  render() {
    const {
      legalIdFrontValid,
      legalIdReversValid,
      settleBankCardFrontValid,
      handheldIdPhotoValid
    } = this.state;
    // 实名配置
    const businessConfig: Array<object> = [{
      key: 'ID_CARD_CORRECT_SIDE',
      title: lang.legalIdFront,
      status: legalIdFrontValid
    }, {
      key: 'ID_CARD_OPPOSITE_SIDE',
      title: lang.legalIdRevers,
      status: legalIdReversValid
    }, {
      key: 'IDENTIFICATION_PHOTO_IN_HAND',
      title: lang.handheldIdPhoto,
      status: handheldIdPhotoValid
    }, {
      key: 'BANK_CARD_CORRECT_SIDE',
      title: lang.settleBankCardFront,
      status: settleBankCardFrontValid
    }];
    return (
      <React.Fragment>
        {this.renderCard()}
        <List style={styles.list}>
          {this.renderBusinessItem(businessConfig)}
        </List>
      </React.Fragment>
    )
  }
}

export default withTheme()(MerchantBusiness as any)
