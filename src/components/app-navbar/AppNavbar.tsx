import { useAppSelector } from '../../_store/hooks';
import { HEADER_BACKGROUND } from '../../types/enums';
import Background from '../../ui/background/Background';
import Header from '../header/Header';

type AppNavbarProps = {
  title?: string;
  height: string;
  isLoggedIn: boolean;
  includeLogoHeader: boolean;
  topTitle?: JSX.Element;
  dividerWidth: number;
};

function AppNavbar(props: AppNavbarProps) {
  const pageTitle = useAppSelector((state) => state.app.pageTitle);



  return (
    <>
      <Background
        backgroundColor={HEADER_BACKGROUND.WhiteIsotope}
        height={props.height}
      >
        <Header
          isLoggedIn={props.isLoggedIn}
          includeLogoHeader={props.includeLogoHeader}
          topTitle={
            props.topTitle || (
              <h1 style={{ fontSize: '2.525rem', marginBottom: '.4rem' }}>
               {pageTitle}
              </h1>
            )
          }
          dividerWidth={props.dividerWidth}
        />
      </Background>
    </>
  );
}

export default AppNavbar;
