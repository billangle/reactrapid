import { AuthUser } from '../../../_store/features/auth/authTypes';
import { useAppSelector } from '../../../_store/hooks';

export function useAuthUser(): AuthUser | null {
  const user: AuthUser | null = useAppSelector((state) => state.auth.user);

  return user;
}
