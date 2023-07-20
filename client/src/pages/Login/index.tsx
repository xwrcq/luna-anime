import React from 'react';
import LoginForm from './LoginForm';
import PageContainer from '../../components/PageContainer';

type Props = {}

const Login = (props: Props) => {
  return (
    <PageContainer>
      <LoginForm />
    </PageContainer>
  )
}

export default Login;