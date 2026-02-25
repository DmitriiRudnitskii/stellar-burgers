import { useNavigate, useLocation } from 'react-router-dom';
import { Modal } from '../modal/modal';
import * as React from 'react';

type TModalRouteProps = {
  children: React.ReactNode;
};

export const ModalRoute: React.FC<TModalRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    if (location.state?.background) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <Modal title='' onClose={handleClose}>
      {children}
    </Modal>
  );
};
