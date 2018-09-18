import Btn from 'reactnativecomponents/Button';
import { main } from '../styles/index';

export const styles = {
  containerStyle: {
    backgroundColor: main,
    minHeight: 45,
    borderWidth: 0
  },
  textStyle: {
    color: '#FFF',
    fontSize: 16
  },
  disabledStyle: {
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  disabledTextStyle: {
    color: '#FFF'
  }
};

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2017/12/19
 */
export default function Button({type, style, containerStyle, textStyle, disabled, ...props} = {}) {
  const containerStyleTmp = [];
  const styleTmp = [];
  if (type !== 'link') {
    containerStyleTmp.push(styles.containerStyle);
    if (disabled) {
      containerStyleTmp.push(styles.disabledStyle);
    }
    // styleTmp.push({margin: 15});
  }
  containerStyleTmp.push(containerStyle);
  styleTmp.push(style);

  return (
    < Btn
  {...
    props
  }
  containerStyle = {containerStyleTmp}
  disabled = {disabled}
  style = {styleTmp}
  textStyle = {[styles.textStyle, textStyle, disabled ? styles.disabledTextStyle : {}
]
}
  type = {type}
  />
)
  ;
}
