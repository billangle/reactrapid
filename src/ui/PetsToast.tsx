// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'react-toastify';

export const showBanner = (
  message = '',
  type: 'info' | 'success' | 'warning' | 'error' = 'success',
  position: 'top-center' | 'top-right' = 'top-center',
) => {
  toast(message, {
    position,
    closeButton: false,
    type,
    theme: 'colored',
    progressStyle: { background: 'transparent' },
  });
};
