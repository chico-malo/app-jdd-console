import { Component } from 'react';
import { Image, StatusBar, View } from 'react-native';
import KeyboardAvoidingView from 'reactnativecomponents/KeyboardAvoidingView';

import logo from '../assets/images/logo.png';
import { main } from '../styles';

const styles = {
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
    marginVertical: 50
  },
  logoImg: {
    resizeMode: 'contain',
    width: 100,
    height: 100
  }
};

/**
 * 带有品牌的容器页面
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/22
 */
export default class BrandContainer extends Component {

  static defaultProps = {
    keyboardShouldPersistTaps: 'handled'
  };

  render() {
    const {children, ...props} = this.props;

    return (
      < KeyboardAvoidingView
    {...
      props
    }
  >
  <
    StatusBar
    backgroundColor = {main}
    barStyle = {Platform.select({
      ios: 'dark-content',
      android: 'light-content'
    })
  }
    />
    < View
    style = {styles.logo
  }>
  <
    Image
    source = {logo}
    style = {styles.logoImg
  }
    />
    < /View>
    {
      children
    }
  <
    /KeyboardAvoidingView>
  )
    ;
  }

}
