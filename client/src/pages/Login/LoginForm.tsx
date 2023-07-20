import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../../services/Auth';
import { setUserData } from '../../store/reducers/authSlice';
import { useAppDispatch } from '../../store';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Loader from '../../components/Loader';
import { Err } from '../../ts/interfaces/error';

type Props = {}

type Values = {
    email: string;
    password: string;
}

const validationScema = yup.object({
    email: yup.string().email("Incorrect email").required('Email is required'),
    password: yup.string().required('Password is required'),
})

const LoginForm = (props: Props) => {
    const [login, { data, isSuccess, isError, isLoading, error }] = useLoginMutation();
    const dispatch = useAppDispatch();

    const onSubmit = async (values: Values) => {
        const data = values;

        const res = await login(data).unwrap();
        dispatch(setUserData(res));

        if (isSuccess) {
            formik.resetForm();
        }

    }

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationScema,
    })

    if (isLoading) return <Loader />;

    return (
        <form className='flex flex-col gap-y-3 w-full items-center' onSubmit={formik.handleSubmit}>
            <div className='border-2 border-black dark:border-white rounded-md flex flex-col w-5/6 gap-y-2 p-6 items-center'>
                <h3>Login</h3>
                {isError ? <div className='text-red-400 text-xs'>{(error as Err).data.message}</div> : <></>}
                <input
                    type="email"
                    name='email'
                    placeholder='Enter your email...'
                    className='max-w-sm dark:text-dark-100'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <div className='text-red-400 text-xs'>
                    {formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                </div>
                <input
                    type="password"
                    name='password'
                    placeholder='Enter your password...'
                    className='max-w-sm dark:text-dark-100'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <div className='text-red-400 text-xs'>
                    {formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                </div>
                <div className='flex justify-center gap-2 flex-wrap xs:flex-nowrap'>
                    <button className='border-2 border-black rounded-md p-2 w-full' type='submit'>Login</button>
                    <span className='border-2 border-black rounded-md p-2 w-full text-center'>
                        <Link to={'/registration'}>Go to Registration</Link>
                    </span>

                </div>
            </div>
        </form>
    )
}

export default LoginForm;