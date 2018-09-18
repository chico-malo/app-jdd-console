import * as React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const defaultStyle = {
  color: '#FFF'
};

export interface Props extends ButtonProps {
  loading?: boolean
}

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/5/4
 */
export default ({
                  loading = false, disabled,
                  children, fullWidth = true, variant = 'raised',
                  color = 'primary', style = defaultStyle,
                  ...props
                }: Props = {}) => (
  <Button {...props}
          disabled={loading || disabled}
          fullWidth={fullWidth}
          variant={variant}
          color={color}
          style={style}
  >
    {loading && <CircularProgress size={20}/>}
    {children}
  </Button>
)
