import { Component } from 'react';
import { connect } from 'react-redux';
import { lang } from '../locale';
import Button from './Button';
import { main } from '../styles';

const styles = {
  button: {
    minHeight: 30,
    borderColor: main
  },
  disabled: {
    borderWidth: 0,
    minHeight: 30
  }
};

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/22
 */
@connect(({sms}) => ({
  countdown: sms.countdown
}))
export default class CheckValueButton extends Component {

  render() {
    const {countdown, onPress} = this.props;
    let disabled = false;
    if (countdown !== 0) {
      disabled = true;
    }
    return (
      < Button
    containerStyle = {disabled ? styles.disabled : styles.button}
    disabled = {disabled}
    onPress = {onPress}
    textStyle = {
    {
      color: disabled ? '#808080' : '#FFF'
    }
  }
  >
    {
      countdown ? `${countdown}` : lang.getCheckValue
    }
  <
    /Button>
  )
    ;
  }

}
