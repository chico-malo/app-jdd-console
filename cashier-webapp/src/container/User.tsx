import * as React from 'react';
import AbstractComponent from 'veigar/AbstractComponent';
import { connect } from 'react-redux';

import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import merchant from 'web-common/components/svg/merchant';
import user from 'web-common/components/svg/user';
import pen from 'web-common/components/svg/pen';
import { lang, title } from 'common/locale';
import { getActions } from 'common/core/store';
import * as styles from '../styles/User.styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/es/List';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import withTheme from '@material-ui/core/styles/withTheme';

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/5/7
 */
@connect(({session}) => ({
  session,
  merchant: session.operator.merchant
}))
class User extends AbstractComponent {

  /**
   * 退出
   */
  handleSignOut() {
    getActions().session.signOut();
    getActions().navigator.navigate('Login');
  }

  /**
   * 渲染图标
   * @param config
   * @returns {any}
   */
  renderListItem(config) {
    return config.map(({label, title, path}, index) => (
      <Grid container
            key={index}
            style={{
              overflow: 'hidden'
            }}
      >
        <ListItem button
                  onClick={() => getActions().navigator.navigate(path)}
        >
          {label}
          <ListItemText primary={title}/>
          <span style={{
            color: 'rgba(189,189,189,1)'
          }}>
            <KeyboardArrowRight color="inherit"/>
          </span>
        </ListItem>
        <Divider inset
                 component="p"
                 style={{
                   width: '100%'
                 }}
        />
      </Grid>
    ));
  }

  render() {
    const {theme} = this.props;
    const {merchantName, merchantNo} = this.props.merchant;
    // 商户修改相关 配置
    const menuMerchant = [{
      label: merchant({
        color: '#29B6F6'
      }),
      title: title.merchantService,
      path: 'MerchantService'
    }, {
      label: user(),
      title: lang.merchantManage,
      path: 'MerchantBusiness'
    }, {
      label: pen({
        color: '#33691E'
      }),
      title: title.updateSettle,
      path: 'MerchantSettlement'
    }];
    return (
      <Grid>
        <List component="nav"
              style={styles.list}
        >
          <ListItem style={{
            ...styles.personal,
            background: theme.palette.primary.main
          }}>
            <Avatar style={styles.logo}>
              {merchant()}
            </Avatar>
            <Grid>
              <p style={styles.merchantName}>{merchantName}</p>
              <p style={styles.merchantNo}>{merchantNo}</p>
            </Grid>
          </ListItem>
          {this.renderListItem(menuMerchant)}
          <ListItem button
                    style={{marginTop: 15}}
                    onClick={this.handleSignOut}
          >
            <ListItemText>
              <div style={{textAlign: 'center'}}>{lang.signOut}</div>
            </ListItemText>
          </ListItem>
        </List>
      </Grid>
    );
  }
}

export default withTheme()(User as any)
