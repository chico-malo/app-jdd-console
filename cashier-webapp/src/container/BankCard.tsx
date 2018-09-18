/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/5/4
 */
import * as styles from '../styles/bankCard.styles';
import * as React from 'react';
import { connect } from 'react-redux';
import AbstractComponent from 'veigar/AbstractComponent';
import Button from '../component/Button';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import ModeEdit from '@material-ui/icons/Edit';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import Dialogs from '../component/Dialogs';

import { getConfig } from 'web-common/constants/BankConfig';
import { bankCardTypeText } from 'web-common/constants/BankCardType';

import { getActions } from 'common/core/store';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

export interface Props {
  cards?: any,
  processing?: boolean,
  isDialog?: boolean,
  children: any
}

@connect(({bank, root}) => ({
  cards: bank.cards,
  processing: bank.processing,
  children: root.children,
  isDialog: root.isDialog
}))
class BankCard extends AbstractComponent<Props> {
  state = {
    open: false,
    id: '',
    cardForm: {},
    delModel: false
  };

  componentWillMount() {
    this.handleSearch();
  }

  /**
   * 请求银行卡
   * @returns {Promise<void>}
   */
  async handleSearch() {
    getActions().bank.startQuery();
  }

  /**
   * 跳转新增银行卡
   */
  handleGoToAddCard() {
    getActions().navigator.navigate({
      routeName: 'BankCardProfile',
      params: {
        isUpdate: false
      }
    });
  }

  /**
   * 删除银行卡
   */
  handleDelCard() {
    const {id} = this.state;
    const {processing} = this.props;
    getActions().bank.startDelCard(id);
    // 根据状态来判断是否关闭弹框
    !processing && this.delClose();
  }

  /**
   * 卡片点击操作
   * @param value 当前卡片配置数据
   */
  handleOperation(value) {
    const {cardForm} = this.state;
    if (value.type === 'edit') {
      this.close();
      getActions().navigator.navigate({
        routeName: 'BankCardProfile',
        params: {
          isUpdate: true,
          card: cardForm
        }
      });
    }
    if (value.type === 'del') {
      // 关闭菜单弹框
      this.close();
      // 打开删除弹框
      this.openDel();
    }
  }

  /**
   * 渲染卡片item
   * @param itemConfig 卡片渲染配置
   * @returns {any}
   */
  listItem(itemConfig) {
    return (
      <List>
        {itemConfig.map((value, index) => (
          <ListItem button
                    key={index}
                    onClick={() => this.handleOperation(value)}
          >
            <ListItemAvatar>
              <Avatar>
                {value.icon}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={value.title}/>
          </ListItem>
        ))}
      </List>
    )
  }

  /**
   * 打开dialog
   * @param cardForm 当前卡片信息
   * @param id 当前卡片信息
   */
  handleOpenDialogs(cardForm, id) {
    this.setState({
      open: true,
      id: id,
      cardForm: cardForm
    })
  }

  openDel() {
    this.setState({
      delModel: true
    })
  }

  /**
   * 关闭弹框
   */
  close() {
    this.setState({
      open: false
    })
  }

  /**
   * 关闭弹框
   */
  delClose() {
    this.setState({
      delModel: false
    })
  }

  /**
   * 渲染bankList
   * @param list list数据
   */
  assemblyBankList(list) {
    return list.map((value, index) => {
      const {cardNo, issuer, cardType, id} = value;
      // 判断是否是默认参数
      if (value.isDefault) {
        return null;
      }
      const {label, icon, colors} = getConfig(issuer);
      let bankNumbers = ['', '****', '****', ''];
      bankNumbers[0] = cardNo.slice(0, 4);
      bankNumbers[3] = cardNo.slice(-4);
      return (
        <ListItem key={index}
                  style={{
                    ...styles.listItems,
                    background: colors[0],
                    marginTop: index > 0 ? '-3%' : '',
                    boxShadow: index > 0 ? '0 -2px 10px 0 rgba(0,0,0,0.8)' : ''
                  }}
                  onClick={() => this.handleOpenDialogs(value, id)}
                  button
                  divider
        >
          <div style={styles.backgroundSvg}>
            {icon({
              width: 180,
              height: 180
            })}
          </div>
          <Avatar style={styles.avatar}>
            {icon({width: 50, height: 50})}
          </Avatar>
          <Grid container
                direction="column"
                style={styles.bankGrid}
          >
            <Grid item>
              <p style={styles.cardLabel}>
                {label}
              </p>
            </Grid>
            <Grid item>
              <p style={styles.cardType}>
                {bankCardTypeText[cardType]}
              </p>
            </Grid>
            <Grid container
                  alignItems="flex-end"
                  justify="space-between"
            >
              <span style={styles.cardNumber}>{bankNumbers[0]}</span>
              <span style={styles.cardNumber}>{bankNumbers[1]}</span>
              <span style={styles.cardNumber}>{bankNumbers[2]}</span>
              <span style={styles.lastCardNumber}>{bankNumbers[3]}</span>
            </Grid>
          </Grid>
        </ListItem>
      )
    });
  }

  render() {
    const {cards, processing} = this.props;
    const {open, delModel} = this.state;
    // 卡片菜单配置
    const itemConfig = [{
      icon: <ModeEdit/>,
      title: '修改卡片信息',
      type: 'edit'
    }, {
      icon: <Delete/>,
      title: '解除绑定',
      type: 'del'
    }];
    return (
      <Grid container
            direction="column"
            justify="space-between"
            style={{minHeight: '100vh'}}
      >
        <Grid container
              style={{flex: '1'}}
        >
          <header style={styles.header}>
            <Button fullWidth
                    style={styles.addCardButton}
                    loading={processing}
                    onClick={this.handleGoToAddCard}
            >
              <Add/>
            </Button>
          </header>
          {
            cards && (
              <List component="nav"
                    style={styles.list}
              >
                {this.assemblyBankList(cards)}
              </List>
            )
          }
          <Dialogs isDialog={open}
                   onClose={this.close}
                   children={this.listItem(itemConfig)}
          />
          <Dialogs isDialog={delModel}
                   onClose={this.delClose}
                   operation={{
                     text: "确认解绑此卡？",
                     handleClose: this.delClose,
                     handleConfirm: this.handleDelCard
                   }}
          />
        </Grid>
        <Grid container
              alignItems="center"
              justify="center"
              style={styles.tips}
        >
          <VerifiedUser/>
          {'账户安全保障'}
        </Grid>
      </Grid>
    )
  }
}

export default BankCard;
