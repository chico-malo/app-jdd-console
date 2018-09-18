import Component from 'reactnativecomponents/AbstractComponent';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import Button from 'reactnativecomponents/Button/index';
import record from 'web-common/components/svg/record';
import cog from 'web-common/components/svg/cog';
import userO from 'web-common/components/svg/userO';

import List from '../components/List';

import { lang, title } from '../locale';
import * as styles from '../styles/User.styles';
import { iconColor, main } from '../styles';
import Title from '../components/Title';


function getIconProps(fill = main) {
  return {
    width: 25,
    height: 25,
    fill
  };
}


/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/3/2
 */
@connect(({session}) => ({
  merchantName: session.operator.merchant.merchantName,
  name: session.operator.name
}))
export default class User extends Component {

  static navigationOptions = {
    headerTitle: title.user,
    tabBarLabel: title.user,
    tabBarIcon: ({tintColor}) => userO({fill: tintColor}),
    headerStyle: styles.header
  };

  merchantItems: Array;

  constructor(props) {
    super(props);

    this.merchantItems = [{
      header: record(getIconProps(iconColor.record)),
      body: lang.collectMoneyRecord,
      route: 'CollectMoneyRecord'
      // }, {
      //   header: users(iconProps),
      //   body: lang.myPromote,
      //   route: 'PromoteUser'
    }];

  }

  handleCellPress(row) {
    if (row.route) {
      actions.navigator.navigate(row.route);
    }
  }

  render() {

    const {name, merchantName} = this.props;

    const SETTINGS = [{
      header: cog(getIconProps(iconColor.settings)),
      body: lang.settings,
      route: 'Settings'
    }];

    return (
      < View
    style = {styles.container
  }>
  <
    Button
    activeOpacity = {1}
    containerStyle = {styles.head
  }
    onPress = {()
  =>
    actions.navigator.navigate('UserCenter')
  }
  >
  <
    Title
    style = {styles.user
  }
    subtitle = {merchantName}
    subtitleStyle = {styles.desc
  }
    title = {name}
    titleStyle = {styles.nickname
  }
    />
    < /Button>
    < ScrollView >
    < List
    containerStyle = {styles.cells
  }
    data = {this.merchantItems
  }
    onItemPress = {this.handleCellPress
  }
    />
    < List
    containerStyle = {styles.cells
  }
    data = {SETTINGS}
    onItemPress = {this.handleCellPress
  }
    />
    < /ScrollView>
    < /View>
  )
    ;
  }

}
