import { CSSProperties, useEffect, useRef } from 'react';
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
import classes from './ConfirmModal.module.scss';

interface ConfirmModalProps {
  getModalRef: (modalRef: any) => void;
  onContinue: () => void;
  continueBtnText?: string;
  cancelBtnText?: string;
  title?: string;
  content?: any;
  buttonGroup?: boolean;
  customStyles?: CSSProperties;
  isLoading?: boolean;
  isNotCloseOnContinue?: boolean;
}

function ConfirmModal(props: ConfirmModalProps) {
  const modalRef = useRef<ModalRef>(null);
  useEffect(() => {
    if (modalRef) {
      props.getModalRef(modalRef);
    }
  }, [modalRef]);

  function onContinue() {
    props.onContinue();
    if (!props.isNotCloseOnContinue) {
      modalRef.current?.toggleModal(undefined, false);
    }
  }
  return (
    <Modal
      style={props.customStyles}
      className={classes['modal-container']}
      ref={modalRef}
      id="confirm-delete-modal"
      aria-labelledby="confirm-delete-modal-heading"
      isLarge
      forceAction
      aria-describedby="confirm-delete-modal-description"
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
      <h1 id="confirm-delete-modal-heading" className={classes['modal-head']}>
        {props.title ? props.title : 'Are you sure you want to delete?'}
      </h1>
      <div className="usa-prose">
        <p id="confirm-delete-modal-description">
          {props.content
            ? props.content
            : `Deleting this record is permanent and cannot be recovered, would you
          like to continue?`}
        </p>
      </div>
      <ModalFooter className={classes.footer}>
        {!props.buttonGroup && (
          <Button
            secondary
            type="button"
            onClick={onContinue}
            style={{ paddingInline: '3rem', margin: 'auto' }}
          >
            {props.continueBtnText}
          </Button>
        )}
        {props.buttonGroup && (
          <ButtonGroup>
            <ModalToggleButton
              modalRef={modalRef}
              outline
              style={{
                marginRight: '1.25rem',
                paddingLeft: '1.875rem',
                paddingRight: '1.875rem',
              }}
              disabled={props.isLoading}
              closer
              className="padding-105 text-center"
            >
              {props.cancelBtnText ? props.cancelBtnText : 'Cancel'}
            </ModalToggleButton>
            <Button
              secondary
              style={{ paddingLeft: '3.125rem', paddingRight: '3.125rem' }}
              type="button"
              onClick={onContinue}
              disabled={props.isLoading}
            >
              {props.continueBtnText ? props.continueBtnText : 'Delete'}
            </Button>
          </ButtonGroup>
        )}
      </ModalFooter>
    </Modal>
  );
}

ConfirmModal.defaultProps = {
  buttonGroup: true,
};

export default ConfirmModal;
