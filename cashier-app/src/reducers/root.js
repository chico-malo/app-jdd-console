import compose from './composeReducer';

const DEFAULT_STATE = {};

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/19
 */
export default compose((state = DEFAULT_STATE, {type, payload = {}}) => {
  switch (type) {
    default:
      return state;
  }

}, DEFAULT_STATE);
