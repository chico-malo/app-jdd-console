import * as React from 'react';
import AbstractComponent from 'veigar/AbstractComponent';

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: -5,
    marginRight: -5
  },
  input: {
    width: 25,
    textAlign: 'center',
    border: 'none',
    borderRadius: 0,
    borderBottomStyle: 'solid',
    borderBottomWidth: 2,
    backgroundColor: 'transparent',
    marginLeft: 5,
    marginRight: 5
  },
  fullScreenAbsolute: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
};

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2017/12/22
 */
export default class PasswordInput extends AbstractComponent<any, any> {

  // refs
  inputs: Array<any> = [];

  state: any = {values: []};

  // vars
  currentIndex = 0;

  getPassword() {
    return this.state.values.join('');
  }

  handleFocus() {
    this.inputs[this.currentIndex] && this.inputs[this.currentIndex].focus();
  }

  handleChangeText(index) {
    return (event) => {
      const {values} = this.state;
      if (values[index]) {
        return;
      }
      const {onTextChange} = this.props;
      const data = event.target.value;
      values[index] = data;
      this.setState({values});
      const nextIndex = index + 1;
      if (data && this.inputs[nextIndex]) {
        this.currentIndex = nextIndex;
        this.inputs[nextIndex].focus();
      }
      onTextChange && onTextChange(this.getPassword());
    };
  }

  handleKeyPress(index) {
    return ({key}) => {
      const {passwordLength, onTextChange} = this.props;
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
        onTextChange && onTextChange(this.getPassword());
      }
    };
  }

  render() {
    const {
      style,
      inputStyle,
      passwordLength,
      autoFocus,
      className,
      type
    } = this.props;
    return (
      <div className={className}
           style={{...styles.container, ...style}}
      >
        {Array.from({length: passwordLength}).map((item, index) => (
          <input autoFocus={autoFocus && index === 0}
                 key={index}
                 maxLength={1}
                 onChange={this.handleChangeText(index)}
                 onKeyUp={this.handleKeyPress(index)}
                 ref={input => this.inputs[index] = input}
                 value={this.state.values[index] || ''}
                 type={type}
                 style={{...styles.input, ...inputStyle}}
          />
        ))}
        <div onClick={this.handleFocus}
             style={{...styles.fullScreenAbsolute, position: 'absolute'}}
        />
      </div>
    );
  }

}
