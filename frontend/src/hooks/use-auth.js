import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';

export function useAuth() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const localUser = {
    id: localStorage.getItem('PortfolioHub-userId'),
    email: localStorage.getItem('PortfolioHub-email'),
  };

  if (localUser.email && localUser.id) {
    dispatch(setUser(localUser));
  }

  return {
    isAuth: !!user.id,
    ...user,
  };
}
