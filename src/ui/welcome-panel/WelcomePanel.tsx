import styles from './WelcomePanel.module.scss';

interface WelcomePanelProps {
  title: string;
  content: string;
}

function WelcomePanel(props: WelcomePanelProps) {
  return (
    <div className={styles.wrapper}>
      <h1>{props.title}</h1>
      <p style={{ fontSize: '1.125rem' }}>{props.content}</p>
    </div>
  );
}

export default WelcomePanel;
