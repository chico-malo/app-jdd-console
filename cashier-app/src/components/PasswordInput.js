import Component from 'reactnativecomponents/AbstractComponent';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import TextField from 'reactnativecomponents/material-ui/TextField';

const styles = {
  container: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    minWidth: 25
  },
  coreInput: {
    textAlign: 'center',
    fontSize: 30
  }
};

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2017/12/22
 */
export default class PasswordInput extends Component {

  static propTypes = {
    /**
     * TextField containerStyle
     */
    containerStyle: PropTypes.any,
    /**
     * 输入框样式
     */
    inputStyle: PropTypes.any,

    /**
     * 密码长度
     */
    passwordLength: PropTypes.number,

    underlineColor: PropTypes.string
  };

  static defaultProps = {
    autoFocus: true,
    secureTextEntry: true,
    keyboardType: 'numeric',
    passwordLength: 6,
    underlineColor: 'rgba(255,255,255,0.6)'
  };

  // refs
  inputs = [];

  state = {values: []};

  // vars
  currentIndex = 0;

  getPassword() {
    return this.state.values.join('');
  }

  handleFocus() {
    this.inputs[this.currentIndex] && this.inputs[this.currentIndex].focus();
  }

  handleChangeText(index) {
    return (data) => {
      const {values} = this.state;
      values[index] = data;
      this.setState({values});
      const nextIndex = index + 1;
      if (data && this.inputs[nextIndex]) {
        this.currentIndex = nextIndex;
        this.inputs[nextIndex].focus();
      }
    };
  }

  handleKeyPress(index) {
    return ({nativeEvent: {key}}) => {
      const {passwordLength} = this.props;
      if (key === 'Backspace') {
        const {values} = this.state;
        if (passwordLength - 1 === index && values[index]) {
          values[index] = '';
        } else {
          const prevIndex = index - 1;
          values[prevIndex] = '';
          this.inputs[prevIndex] && this.inputs[prevIndex].focus();
          if (this.inputs[prevIndex]) {
            this.inputs[prevIndex].focus();
            this.currentIndex = prevIndex;
          }
        }
        this.setState({values});
      }
    };
  }

  render() {
    const {
      style, inputStyle, passwordLength, keyboardType,
      containerStyle, underlineColor, autoFocus, secureTextEntry
    } = this.props;
    return (
      < View
    style = {[styles.container, style
  ]
  }>
    {
      Array.from({length: passwordLength}).map((item, index) => (
        < TextField
      autoFocus = {autoFocus && index === 0
    }
      containerStyle = {[styles.input, containerStyle
    ]
    }
      inputStyle = {[styles.coreInput, inputStyle
    ]
    }
      key = {index}
      keyboardType = {keyboardType}
      maxLength = {1}
      onChangeText = {this.handleChangeText(index)
    }
      onKeyPress = {this.handleKeyPress(index)
    }
      ref = {input
    =>
      this.inputs[index] = input
    }
      secureTextEntry = {secureTextEntry}
      underlineFocusStyle = {
      {
        borderColor: underlineColor
      }
    }
      underlineStyle = {
      {
        borderWidth: 1, borderColor
      :
        underlineColor
      }
    }
      value = {this.state.values[index]
    }
      />
    ))
    }
  <
    TouchableOpacity
    onPress = {this.handleFocus
  }
    style = {common.fullScreenAbsolute
  }
    />
    < /View>
  )
    ;
  }

}
