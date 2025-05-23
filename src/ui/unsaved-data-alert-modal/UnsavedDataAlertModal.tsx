import { useEffect, useRef } from 'react';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Modal,
  ModalToggleButton,
  ModalFooter,
  ButtonGroup,
  ModalRef,
  Button,
} from '@trussworks/react-uswds';
import classes from './UnsavedDataAlertModal.module.scss';

interface UnsavedDataAlertModalProps {
  getModalRef: (modalRef: any) => void;
  onContinue: () => void;
}

function UnsavedDataAlertModal(props: UnsavedDataAlertModalProps) {
  const modalRef = useRef<ModalRef>(null);
  useEffect(() => {
    if (modalRef) {
      props.getModalRef(modalRef);
    }
  }, [modalRef]);

  function onContinue() {
    props.onContinue();
    modalRef.current?.toggleModal(undefined, false);
  }
  return (
    <Modal
      className={classes['modal-container']}
      ref={modalRef}
      id="unsaved-alert-modal"
      aria-labelledby="unsaved-alert-modal-heading"
      isLarge
      forceAction
      aria-describedby="unsaved-alert-modal-description"
    >
      <ModalToggleButton
        className={classes['close-toggle-btn']}
        modalRef={modalRef}
        closer
      >
        <FontAwesomeIcon
          color={'#0b3d91'}
          style={{ fontSize: '24px', marginRight: '0.4375rem' }}
          icon={faTimesCircle}
          className="font-body-2xs padding-left-1"
        />
        <span>Close</span>
      </ModalToggleButton>
      <h1 id="unsaved-alert-modal-heading" className={classes['modal-head']}>
        You have unsaved changes
      </h1>
      <div className="usa-prose">
        <p id="unsaved-alert-modal-description">
          Leaving this page may result in unsaved or lost data, would you like
          to continue?
        </p>
      </div>
      <ModalFooter>
        <ButtonGroup>
          <ModalToggleButton
            modalRef={modalRef}
            outline
            style={{
              marginRight: '1.25rem',
              paddingLeft: '1.875rem',
              paddingRight: '1.875rem',
            }}
            closer
            className="padding-105 text-center"
          >
            Cancel
          </ModalToggleButton>
          {/* <ModalToggleButton
            modalRef={modalRef}
            // closer
            
            onClick={() => onContinue()}
          >
            
          </ModalToggleButton> */}
          <Button
            style={{ paddingLeft: '3.125rem', paddingRight: '3.125rem' }}
            type="button"
            onClick={onContinue}
          >
            Continue
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </Modal>
  );
}

export default UnsavedDataAlertModal;
