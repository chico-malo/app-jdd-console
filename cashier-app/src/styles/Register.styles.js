import { backgroundColor, main } from './index';

export {
  main
};

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/3/2
 */
export default {
  container: {
    flex: 1,
    backgroundColor,
    paddingTop: 15
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    color: '#FFF'
  },
  input: {
    alignItems: 'center',
    borderWidth: 0
  },
  submit: {
    margin: 15,
    backgroundColor: main
  },
  scan: {
    borderWidth: 0,
    paddingRight: 0
  },
  inviteCodeTip: {
    padding: 10,
    color: '#bfbfbf'
  }
};
