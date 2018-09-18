import Component from 'reactnativecomponents/AbstractComponent';
import { Text, View } from 'react-native';
import { TabBarBottom, TabNavigator } from 'react-navigation';

import GridView from 'reactnativecomponents/GridView';

import home from 'web-common/components/svg/home';
import collectMoney from 'web-common/components/svg/collectMoney';
import record from 'web-common/components/svg/record';
import scan from 'web-common/components/svg/scan';
import balance from 'web-common/components/svg/balance';

import Button from '../components/Button';


import { lang, title } from '../locale';
import { fontColor, iconColor, main } from '../styles';
import * as styles from '../styles/Home.styles';

import User from './User';


const HEADER_FUNC_CELLS = [{
  icon: scan({fill: '#FFF'}),
  label: lang.scan,
  route: 'ScanQrcode'
}, {
  icon: collectMoney({fill: '#FFF'}),
  label: lang.collectMoney,
  route: 'CollectMoney'
}, {
  icon: balance({
    fill: '#FFF',
    width: 32,
    height: 32
  }),
  label: lang.balance,
  route: 'Balance'
}];

const FUNC_CELLS = [{
  icon: collectMoney({fill: iconColor.collectMoney}),
  label: lang.collectMoney,
  route: 'CollectMoney'
}, {
  icon: record({fill: iconColor.record, width: 30, height: 32}),
  label: lang.collectMoneyRecord,
  route: 'CollectMoneyRecord'
}];

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/19
 */
class Index extends Component {

  static navigationOptions = {
    headerTitle: title.app,
    headerBackTitle: title.app,
    tabBarLabel: title.app,
    tabBarIcon: ({tintColor}) => home({fill: tintColor})
  };

  handleCellPress(route) {
    return () => {
      actions.navigator.navigate(route);
    };
  }

  renderCell(backgroundColor, color = '#FFF') {
    return ({cell}) => {
      const {icon, label, route} = cell;
      const before = (
        < View
      style = {
      {
        width: 32, height
      :
        32, justifyContent
      :
        'center', alignItems
      :
        'center'
      }
    }>
      {
        icon
      }
    <
      /View>
    )
      ;

      return (
        < Button
      before = {before}
      containerStyle = {[styles.cellBtn,
      {
        backgroundColor
      }
    ]
    }
      onPress = {this.handleCellPress(route)
    }
      textStyle = {[styles.cellBtnText,
      {
        color
      }
    ]
    }
    >
      {
        label
      }
    <
      /Button>
    )
      ;
    };
  }

  render() {
    return (
      < View >
      < GridView
    cells = {FUNC_CELLS}
    cols = {3}
    containerStyle = {styles.cellGrid
  }
    renderCell = {this.renderCell('#FFF', fontColor)
  }
    />
    < /View>
  )
  }

}

const Home = TabNavigator({
  index: {
    screen: Index
  },
  user: {
    screen: User
  }
}, {
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    // style: styles.tabBar,
    activeTintColor: main
  },
  backBehavior: 'none',
  swipeEnabled: false
});

Home.navigationOptions = {};

export default Home;
