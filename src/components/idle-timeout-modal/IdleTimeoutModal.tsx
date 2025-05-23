import useIdleTimeout from '../../hooks/useIdleTimeout';
import { useRef, useContext, useEffect, useState } from 'react';
import classes from './IdleTimeoutModal.module.scss';
import {
  Button,
  ButtonGroup,
  Modal,
  ModalFooter,
  ModalHeading,
  ModalRef,
  ModalToggleButton,
} from '@trussworks/react-uswds';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../_store/store';
import { useNavigate } from 'react-router-dom';
import { appReset } from '../../_store/features/app/appSlice';
import { authReset, signout } from '../../_store/features/auth/authSlice';
import { userReset } from '../../_store/features/users/usersSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
export const IdleTimeoutModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const onIdleHandler = () => {
    modalRef.current?.toggleModal(undefined, false);
    localStorage.setItem('inactiveLogout', 'true');
    logoutHandler();
  };
  const onPromptHandler = () => {
    modalRef.current?.toggleModal(undefined, true);
  };
  const logoutHandler = () => {
    dispatch(appReset());
    dispatch(authReset());
    dispatch(userReset());
    dispatch(signout());
    if (localStorage.getItem('inactiveLogout')) {
      navigate('/inactive-logged-out');
      if (import.meta.env.VITE_ENV !== 'prod') {
        localStorage.removeItem('inactiveLogout');
      }
    } else {
      navigate('/');
    }
  };
  const resetIdleHandler = () => {
    modalRef.current?.toggleModal(undefined, false);
    idleTimer.reset();
  };
  const { idleTimer, remainingIdleTime } = useIdleTimeout(
    onIdleHandler,
    onPromptHandler,
  );
  const modalRef = useRef<ModalRef>(null);

  return (
    <div>
      <Modal
        id={'idle-modal'}
        forceAction
        isLarge
        aria-describedby="idle-modal"
        aria-labelledby="idle-modal"
        ref={modalRef}
        className={classes['modal-container']}
      >
        <ModalHeading>
          <FontAwesomeIcon
            color={'#d13621'}
            style={{ marginRight: '0.5rem' }}
            icon={faClock}
          />
          Are you still here?
        </ModalHeading>
        <p>
          RAPID CC has been idle for more than
          {Math.ceil(
            (import.meta.env.VITE_IDLE_TIMEOUT_SEC -
              import.meta.env.VITE_PROMPT_BEFORE_IDLE_TIMEOUT_SEC) /
              60,
          )}{' '}
          minutes. Please continue working or you will be{' '}
          <b>
            automatically logged out in{' '}
            {remainingIdleTime > 60000
              ? Math.ceil(remainingIdleTime / 1000 / 60)
              : Math.ceil(remainingIdleTime / 1000)}
            {remainingIdleTime > 60000 ? ' minute(s). ' : ' second(s). '}
          </b>
          Any work not saved will be lost.
        </p>
        <ModalFooter>
          <ButtonGroup>
            <Button type="button" outline onClick={logoutHandler}>
              Logout
            </Button>
            <Button type="button" onClick={resetIdleHandler}>
              I'm still here
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </Modal>
    </div>
  );
};
