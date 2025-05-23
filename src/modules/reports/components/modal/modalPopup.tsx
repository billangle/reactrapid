import classes from './modal.module.scss';

function ModalPopup(props: any) {
  return <div className={classes.modalWrapper}>{props.children}</div>;
}

export default ModalPopup;
