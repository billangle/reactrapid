import { CSSProperties } from 'react';
import { colorMap } from '../../types/constants';

type Props = {
  width?: number;
  height?: number;
  color?: string;
  style?: CSSProperties;
};

function Divider(props: Props) {
  return (
    <div
      style={{
        width: `${props.width ? props.width : 100}%`,
        height: `${props.height ? props.height : 0.625}rem`,
        backgroundColor: `${props.color ? props.color : colorMap.crimson}`,
        ...props.style,
      }}
    ></div>
  );
}

export default Divider;
