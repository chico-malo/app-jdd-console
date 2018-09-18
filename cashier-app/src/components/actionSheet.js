import { popup } from 'reactnativecomponents/modal';
import { getWindowSize } from '../styles';

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2017/12/28
 */
export default ({content, contentStyle, height, duration, ...props}) => popup({
  ...props,
  content,
  maskStyle: {
    justifyContent: 'flex-end'
  },
  containerStyle: {
    marginHorizontal: 0,
    borderRadius: 0,
    borderWidth: 0
  },
  contentStyle: {
    paddingHorizontal: 0,
    height: height || getWindowSize().height / 1.7,
    backgroundColor: 'rgba(255,255,255,.9)',
    ...contentStyle
  },
  hideAnimation: {
    animation: {
      from: {
        translateY: 0
      },
      to: {
        translateY: height || getWindowSize().height / 1.7
      }
    },
    duration: duration || 400
  }
});
