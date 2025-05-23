import { CSSProperties } from 'react';
import ReturnToTop from '../../ui/return-to-top/ReturnToTop';
import classes from './LegalNotices.module.scss';
import Background from '../../ui/background/Background';
import { HEADER_BACKGROUND, MODULE, PAGE_TITLE } from '../../types/enums';

type Props = {
  text?: string;
  title?: string;
  returnToTopStyles?: CSSProperties;
};

function LegalNotices(props: Props) {
  return (
   
    <div >
       <Background
        backgroundColor={HEADER_BACKGROUND.WhiteIsotope}
        height="548.396px"
      >
     <></>
    </Background>
    </div>
  );
}

export default LegalNotices;
