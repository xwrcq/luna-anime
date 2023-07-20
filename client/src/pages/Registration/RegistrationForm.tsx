import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store';
import { Link, useNavigate } from 'react-router-dom';
import { useRegistrationMutation } from '../../services/Auth';
import { setUserData } from '../../store/reducers/authSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Loader from '../../components/Loader';
import { Err } from '../../ts/interfaces/error';

type Props = {}

type Values = {
    nickname: string;
    email: string;
    password: string;
}

const PASSWORDREGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

const validationScema = yup.object({
    nickname: yup.string().min(3, "Nickname is too short").max(20, "Nickname is too long").required(),
    email: yup.string().email("Incorrect email").required('Email is required'),
    password: yup.string().matches(PASSWORDREGEX, 'Password isn\'t strong enough').required('Password is required'),
})

const RegistrationForm = (props: Props) => {
    const [registration, { data, isSuccess, isError, isLoading, error }] = useRegistrationMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSubmit = async (values: Values) => {
        const data = values;
        const res = await registration(data).unwrap();

        if (isSuccess) {
            formik.resetForm();
        }
    }

    const formik = useFormik({
        initialValues: { nickname: "", email: "", password: "" },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationScema
    })

    return (
        <>            
            <form className='flex flex-col gap-y-2 w-full items-center' onSubmit={formik.handleSubmit}>
                {isLoading ?
                    <Loader />
                    :
                    <div className='border-2 border-black dark:border-white rounded-md flex flex-col w-5/6 gap-y-2 p-6 items-center'>
                        <h3>Registration</h3>
                        {isError ? <div className='text-red-400 text-xs'>{(error as Err).data.message}</div> : <></>}
                        {isSuccess ? <div className='text-green-400 text-xs'>Submit your email to finish registration</div> : <></>}
                        <div className='flex flex-col'>
                            <input
                                type="text"
                                name='nickname'
                                placeholder='Enter your nickname...'
                                className='max-w-sm dark:text-dark-100'
                                value={formik.values.nickname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <div className='text-red-400 text-xs'>
                                {formik.touched.nickname && formik.errors.nickname ? formik.errors.nickname : ''}
                            </div>
                        </div>
                        <div className='flex flex-col'>
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
                        </div>

                        <div className='flex flex-col'>
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
                        </div>
                        <div className='flex justify-center gap-2 flex-wrap xs:flex-nowrap'>
                            <button className='border-2 border-black rounded-md p-2 w-full' type='submit'>Registration</button>
                            <span className='border-2 border-black rounded-md p-2 w-full text-center'>
                                <Link to={'/login'}>Go to Login</Link>
                            </span>

                        </div>
                    </div>
                }
            </form>
        </>
    )
}

export default RegistrationForm;