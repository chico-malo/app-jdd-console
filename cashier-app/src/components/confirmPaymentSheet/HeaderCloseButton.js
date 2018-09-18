import HeaderButton from '../HeaderButton';

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2017/12/22
 */
export default ({onPress}) => (
  < HeaderButton
onPress = {onPress} >
  {error({fontColor, width: 17, height: 17})}
  < /HeaderButton>
)
;

