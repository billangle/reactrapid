import { useRef, useState, useEffect } from 'react';
import { HEADER_BACKGROUND, MODULE, PAGE_TITLE } from '../../types/enums';
import Header from '../header/Header';
import classes from './LoginForm.module.scss';
import { FormProvider, useForm } from 'react-hook-form';
import Background from '../../ui/background/Background';
import Card from '../../ui/card/Card';
import LegalNotices from '../legal-notices/LegalNotices';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Button } from '@trussworks/react-uswds';
import { useDispatch } from 'react-redux';
import Input from '../../ui/input/Input';
import { AppDispatch } from '../../_store/store';
import { doLogin } from '../../_store/features/auth/authActions';
import { colorMap } from '../../types/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';


const topTitle = <h1>Right Angle Research</h1>;

const informationText = (
  <div>
  <h3>
 Site Information
  </h3>
  <div>
    The <a href='https://github.com/billangle/rapidbe' target='blank'>rapidbe</a> repository outlines a backend service designed to manage users within AWS Cognito User Pools. It employs AWS CDK for infrastructure provisioning, deploying Lambda functions and REST endpoints through API Gateway. The project integrates GitHub Actions for CI/CD workflows and includes Swagger documentation for API endpoints.
<p></p>
The  <a href='https://github.com/billangle/reactrapid' target='blank'>reactrapid</a> repository contains a ReactJS-based frontend application that utilizes Redux Toolkit for state management and middleware functionality. Built with Vite and styled using SCSS, the application features a left navigation component granting access to modules. The initial implementation includes 'users' and 'reports' modules as examples.
<p></p>
Together, these repositories form a full-stack application framework, combining AWS-managed backend services with a modular React frontend. This setup facilitates rapid development and deployment of scalable web applications.
  </div>
  </div>
);
const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<any>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [, setCardHeight] = useState<number>(0);
  const { register, handleSubmit } = useForm({
    defaultValues: { userName: '', password: '' },
  });
  const [loginError, setLoginError] = useState('');

  const formRef = useRef<HTMLDivElement>(null);

  const loginSubmit = async (data: any) => {
    setIsLoading(true);
    dispatch(doLogin({ username: data.username, password: data.password }))
      .then((res: any) => {
        if (res.error) {
          console.error(res.error);
          throw new Error(res.error);
        }
        setLoginError('');
        setTimeout(() => {
          //  console.log('navigate to /report/dashboard');
            navigate('/users/dashboard');
   
        }, 100);
      })
      .catch((e) => {
        setLoginError(
          'The username and/or password is incorrect. Please check your information and try again.',
        );
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (formRef.current) {
      setCardHeight(formRef.current.offsetHeight);
    }
  }, [formRef]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{PAGE_TITLE.login}</title>
        </Helmet>
      </HelmetProvider>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <Background
            backgroundColor={HEADER_BACKGROUND.WhiteIsotope}
            height="548.396px"
          >
            <Header
              direction="vertical"
              topTitle={topTitle}
              informationText={informationText}
              includeLogoHeader={true}
              forceHideActions={true}
            />
          </Background>
        </div>
        <Background
          backgroundColor={HEADER_BACKGROUND.WhiteIsotope}
          height="548.396px"
        >
          <Card customClass={classes.card}>
            <div ref={formRef} className={classes['form-container']}>
              <h2
                style={{ margin: 0, fontSize: '1.25rem', paddingTop: '1rem' }}
              >
              Right Angle Research Login
              </h2>

              {loginError !== '' && (
                <p style={{ color: colorMap.crimson, marginTop: 0 }}>
                  {loginError}
                </p>
              )}
               <div className={classes['subtitle-container']}>
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  className={classes.icon}
                  style={{ width: '1.5rem', height: '1.5rem' }}
                />
                <p
                  className={classes['info-text']}
                 style={{ fontWeight: 'bold', fontSize: '1rem' }}
                >
                  First-time users must{' '}
                  <Link
                    to="/registration"
                    className={`${classes.link} ${classes.bold}`}
                  >
                    {' '}
                    register for an account
                  </Link>
                  .
                </p>
              </div>
              <FormProvider {...methods}>
                <form>
                  <div className={classes.formControl}>
                    <Input
                      label={'Username'}
                      id="Username"
                      formControlName="username"
                      aria-required="true"
                      type="text"
                      validations={{
                        required: 'Enter your username.',
                      }}
                      style={{ padding: 0, margin: 0 }}
                    />
                  </div>
                  <div className={classes.formControl}>
                    <Input
                      label={'Password'}
                      id="password"
                      formControlName="password"
                      aria-required="true"
                      type="password"
                      validations={{
                        required: 'Enter your password.',
                      }}
                      style={{ margin: 0 }}
                    />
                  </div>
                  <br />
                  <Button
                    disabled={isLoading}
                    onClick={methods.handleSubmit(loginSubmit)}
                    type="submit"
                  >
                    Login
                  </Button>
                </form>
              </FormProvider>

              <div className={classes['link-container']}>
                {/* 
  
                <Button unstyled type="button" className={classes['link-btn']}>
                  Forgot username?
                </Button>
                <Button unstyled type="button" className={classes['link-btn']}>
                  Forgot password?
                </Button>
                    */}

              </div>


            </div>
          </Card>
        </Background>
      </div>
      <LegalNotices />
    </>
  );
};

export default LoginForm;
