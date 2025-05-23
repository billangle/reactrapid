import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { HEADER_BACKGROUND } from '../../types/enums';
import classes from './Background.module.scss';
import { BLACK_ISOTOP, WHITE_ISOTOP } from '../../assets/image-urls';

const StyledDiv = styled.div((props: any) => {
  let retStyles = {
    ...props.style,
    height: props.height
      ? props.height
      : props.isLoggedIn
      ? '7.8769rem'
      : '15.6269rem',
  };
  if (props.backgroundUrl) {
    retStyles = {
      ...retStyles,
      background: `url(${props.backgroundUrl})`,
    };
  }
  return retStyles;
});
interface BackgroundPropToClassName {
  [HEADER_BACKGROUND.BlackIsotope]: string;
  [HEADER_BACKGROUND.WhiteIsotope]: string;
  [HEADER_BACKGROUND.LightPink]: string;
  [HEADER_BACKGROUND.LightBlue]: string;
}

const backgroundPropToClassName: BackgroundPropToClassName = {
  [HEADER_BACKGROUND.BlackIsotope]: 'black-isotope',
  [HEADER_BACKGROUND.WhiteIsotope]: 'white-isotope',
  [HEADER_BACKGROUND.LightPink]: 'pink-background',
  [HEADER_BACKGROUND.LightBlue]: 'blue-background',
};
type Props = {
  backgroundColor: keyof BackgroundPropToClassName;
  children: React.ReactNode;
  height?: number | string;
  isLoggedIn?: boolean;
  style?: object;
};

function Background(props: Props) {
  const [backgroundUrl, setBackgroundUrl] = useState('');
  const bgClasses = `${
    props.backgroundColor &&
    classes[backgroundPropToClassName[props.backgroundColor]]
  }`;
  useEffect(() => {
    if (props.backgroundColor === HEADER_BACKGROUND.WhiteIsotope) {
      setBackgroundUrl(WHITE_ISOTOP);
    } else if (props.backgroundColor === HEADER_BACKGROUND.BlackIsotope) {
      setBackgroundUrl(BLACK_ISOTOP);
    }
  }, []);

  return (
    <StyledDiv
      className={bgClasses}
      height={props.height}
      isLoggedIn={props.isLoggedIn}
      backgroundUrl={backgroundUrl}
    >
      {props.children}
    </StyledDiv>
  );
}

export default Background;
