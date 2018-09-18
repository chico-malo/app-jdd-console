import Component from 'reactnativecomponents/AbstractComponent';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';

import splashScreen from '../assets/images/splashScreen.png';
import MerchantStatus from '../constants/MerchantStatus';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/3/2
 */
@connect(({session}) => ({
  loginSuccess: session.loginSuccess,
  merchantStatus: session.operator.merchant.status
}))
export default class SplashScreen extends Component {

  waitTask;

  componentDidMount() {
    this.waitTask = setTimeout(() => {
      let route = 'Login';
      const {loginSuccess, merchantStatus} = this.props;
      if (loginSuccess) {
        if (merchantStatus === MerchantStatus.waitActive) {
          route = 'RegisterSecondStep';
        } else {
          route = 'Home';
        }
      }
      actions.navigator.reset(route);
    }, 3000);
  }

  componentWillUnmount() {
    this.waitTask && clearTimeout(this.waitTask);
  }

  render() {
    return (
      < View
    style = {styles.container
  }>
  <
    Image
    source = {splashScreen}
    style = {styles.splashScreen
  }
    />
    < /View>
  )
    ;
  }

}

