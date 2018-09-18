import * as React from 'react';
import { AbstractInput, BaseProps } from 'veigar/Input/AbstractInput';
import field from 'veigar/Form/field';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';


interface BaseInputProps extends BaseProps {
}

export type InputProps = BaseInputProps & TextFieldProps;

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/5/4
 */
@field
export class Input extends AbstractInput<InputProps, any> {

  static defaultProps = {
    style: {
      height: 70
    }
  };

  handleChange(event) {
    const {onChange} = this.props;
    const value = event.target.value;
    this.setState({value});
    this.valid();
    onChange && onChange(event);
  }

  render() {
    const {error, mismatch, miss} = this.state;

    const {missMsg, mismatchMsg, errorMsg, ...props} = this.props;

    const newProps: InputProps = {...props};

    const isError = miss || mismatch || error;
    if (isError) {
      if (miss) {
        newProps.helperText = missMsg;
      } else if (mismatch) {
        newProps.helperText = mismatchMsg;
      } else {
        newProps.helperText = errorMsg;
      }
    }

    return (
      <TextField {...newProps}
                 error={miss || mismatch || error}
                 onChange={this.handleChange}
                 onBlur={this.handleChange}
                 value={this.state.value}
      />
    )
  }
}
