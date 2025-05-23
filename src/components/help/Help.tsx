import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from '../header/Header';
import { HEADER_BACKGROUND } from '../../types/enums';
import Background from '../../ui/background/Background';
import Card from '../../ui/card/Card';
import classes from './Help.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

const Help = () => {
  const topTitle = <h1>Rapid CC Help</h1>;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>HELP - RAPID CC</title>
        </Helmet>
      </HelmetProvider>
      <Background
        backgroundColor={HEADER_BACKGROUND.WhiteIsotope}
        height="212.031px"
      >
        <Header
          dividerWidth={40}
          includeLogoHeader={true}
          topTitle={topTitle}
        />
      </Background>
      <Card customClass={classes.card}>
        <h2 id="top">General Questions</h2>
        <ul>
          <li className={classes.links}>
            <a href="#one">
              What are the minimum operating system and browser requirements for
              using RAPID CC?
            </a>
          </li>
         
     
       
        </ul>
      </Card>
   
  
    </>
  );
};

export default Help;
