import React from 'react';
import Loader from '../components/Loader';
import { userApi } from '../services/User';

type IAuthMiddleware = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');;

  const { isLoading } = userApi.endpoints.getUser.useQuery(null , {
    skip: !accessToken,
  });

  if (isLoading) {
    return <Loader />
  }

  return children;
};

export default AuthMiddleware;