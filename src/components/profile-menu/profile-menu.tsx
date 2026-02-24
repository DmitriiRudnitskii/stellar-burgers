import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch,useSelector } from '../../services/store';
import { logoutUser, getUserSelector} from '../../services/slices/userSlice';


export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isAuthenticated} = useSelector(getUserSelector)
  const handleLogout = () => {
    dispatch(logoutUser())
  };
  if(!isAuthenticated ) {
    navigate('/login')
  }

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
