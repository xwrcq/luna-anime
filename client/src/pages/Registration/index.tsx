import React from 'react';
import RegistrationForm from './RegistrationForm';
import PageContainer from '../../components/PageContainer';

type Props = {}

const Registration = (props: Props) => {
  return (
    <PageContainer>
      <RegistrationForm />
    </PageContainer>
  )
}

export default Registration;