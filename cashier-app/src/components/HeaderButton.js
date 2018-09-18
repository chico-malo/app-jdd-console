import { Component } from 'react';
import { I18nManager, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    margin: Platform.OS === 'ios' ? 10 : 16,
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]
  }
});

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/6/16
 */
export default class HeaderButton extends Component {

  render() {
    const {children, onPress, textStyle, style, contentStyle, ...props} = this.props;
    let child = children;
    if (typeof children === 'string') {
      child = (
        < Text
      style = {[{fontSize: 17}, textStyle
    ]
    }>
      {
        children
      }
    <
      /Text>
    )
      ;
    }

    return (
      < TouchableOpacity
    {...
      props
    }
    onPress = {onPress}
    style = {[styles.buttonContainer, style
  ]
  }
  >
  <
    View
    style = {[styles.button, contentStyle
  ]
  }>
    {
      child
    }
  <
    /View>
    < /TouchableOpacity>
  )
    ;
  }

}
