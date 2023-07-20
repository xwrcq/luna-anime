import React, { useEffect } from 'react'
import PageContainer from '../../components/PageContainer';
import { useRegistrationMutation } from '../../services/Auth';

type Props = {}

const EmailActivation = (props: Props) => {

    return (
        <PageContainer classStyles='flex'>
            <div className='w-2/5 h-1/3 m-auto text-center rounded-md'>
                <div>Email Activation</div>
                <div>check your email address and activate your account</div>
            </div>
        </PageContainer>
    )
}

export default EmailActivation;