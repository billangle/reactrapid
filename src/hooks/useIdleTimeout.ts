import { useContext, useEffect, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';

const useIdleTimeout = (onIdle: () => void, onPrompt: () => void) => {
  // const useIdleTimeout = () => {

  const idleTimeout = 1000 * import.meta.env.VITE_IDLE_TIMEOUT_SEC;
  const promptBeforeIdle =
    1000 * import.meta.env.VITE_PROMPT_BEFORE_IDLE_TIMEOUT_SEC;
  const [remainingIdleTime, setRemainingIdleTime] = useState(0);
  const idleTimer = useIdleTimer({
    timeout: idleTimeout,
    promptBeforeIdle: promptBeforeIdle,
    onPrompt: onPrompt,
    onIdle: onIdle,
    debounce: 500,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      // console.log('r', idleTimer.getRemainingTime());
      setRemainingIdleTime(idleTimer.getRemainingTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    remainingIdleTime,
    idleTimer,
  };
};
export default useIdleTimeout;
