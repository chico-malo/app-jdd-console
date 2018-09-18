import DefaultList from 'reactnativecomponents/List';
import right from 'web-common/components/svg/right';

export const defaultRightArrow = (right({fill: '#7E848E'}));
const defaultItemStyle = {
  height: 55
};

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2017/12/19
 */
export default function List({
                               rightArrow = defaultRightArrow,
                               itemStyle = defaultItemStyle,
                               separatorColor = '#E2E6E9',
                               ...props
                             } = {}) {
  return (
    < DefaultList
  {...
    props
  }
  itemStyle = {itemStyle}
  rightArrow = {rightArrow}
  separatorColor = {separatorColor}
  />
)
  ;
}
