import { useNavigate } from 'react-router-dom';
import { USCIS_LOGO_URL } from '@/assets/image-urls';

type Props = {
  height?: string;
  width?: string;
  titlelogo?: string;
};

function Logo({ height = '70px', width = '200px', titlelogo = '' }: Props) {
  const navigate = useNavigate();
  return (
    <img
      style={{ height, width, cursor: 'pointer' }}
      src={USCIS_LOGO_URL}
      alt="Logo"
      title="Logo"
    />
  );
}

export default Logo;
