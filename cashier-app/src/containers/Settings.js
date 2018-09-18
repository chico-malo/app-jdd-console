import Component from 'reactnativecomponents/AbstractComponent';
import { View } from 'react-native';
import Button from 'reactnativecomponents/Button';

import List from '../components/List';
import { lang, title } from '../locale';
import { signOutColor } from '../styles/Settings.styles';

/**
 * 设置页面
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/3/7
 */
export default class Settings extends Component {

  static navigationOptions = {
    headerTitle: title.settings
  };

  handleItemPress(row) {
    actions.navigator.navigate(row.route);
  }

  render() {

    const cells = [{
      body: lang.passwordModify,
      route: 'ModifyPassword'
    }, {
      body: lang.aboutUs,
      route: 'AboutUs'
    }];

    return (
      < View
    style = {styles.container
  }>
  <
    List
    containerStyle = {styles.cells
  }
    data = {cells}
    onItemPress = {this.handleItemPress
  }
    />
    < Button
    containerStyle = {styles.signOut
  }
    onPress = {actions.session.signOut
  }
    textStyle = {
    {
      color: signOutColor
    }
  }
  >
    {
      lang.signOut
    }
  <
    /Button>
    < /View>
  )
    ;
  }

}

