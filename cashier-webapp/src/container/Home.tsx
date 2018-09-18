import * as React from 'react';
import Component from 'veigar/AbstractComponent';
import { connect } from 'react-redux';

import home from 'web-common/components/svg/home';
import user from 'web-common/components/svg/user';

import * as styles from '../styles/Home.styles';
import { title } from 'common/locale';
import User from './User';
import Index from './HomeIndex';
import { isIPhoneX } from '../utils/BrowserUtils';
import { getActions } from 'common/core/store';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Grid from '@material-ui/core/Grid';
import BottomNavigation from '@material-ui/core/BottomNavigation';

const tabRoutes = [Index, User];
const titles = [title.app, title.user];

@connect(({root}) => ({
  navigationValue: root.navigationValue
}))
export default class Home extends Component {
  state = {
    Container: Index
  };

  componentWillMount() {
    const {navigationValue} = this.props;
    // 获取上一次导航的value，加载模块
    this.setState({Container: tabRoutes[navigationValue]});
  }

  handleChange(event, value) {
    const {navigationValue} = this.props;
    if (navigationValue === value)
      return;
    // 如果当前value不等于点击的value，替换title，加载跳转的模块，发送action改变reduxvalue
    document.title = titles[value];
    this.setState({Container: tabRoutes[value]});
    getActions().root.bottomNavigationAction(value);

  };

  render() {
    const {Container} = this.state;
    const {navigationValue} = this.props;
    return (
      <Grid container
            direction="column"
            justify="space-between"
            style={styles.container}
      >
        <Container/>
        <BottomNavigation value={navigationValue}
                          onChange={this.handleChange}
                          style={{
                            ...styles.navigation,
                            paddingBottom: isIPhoneX() && 23 || 0
                          }}
                          showLabels
        >
          <BottomNavigationAction label={title.app} icon={home()}/>
          <BottomNavigationAction label={title.user} icon={user()}/>
        </BottomNavigation>
      </Grid>
    )
  }
}
