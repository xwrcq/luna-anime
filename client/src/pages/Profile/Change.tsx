import React, { useCallback, useState } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';
import { IUser } from '../../ts/interfaces/user';
import StyledButton from '../../components/StyledButton';
import { useUpdateUserMutation } from '../../services/User';
import { useAppDispatch } from '../../store';
import { setUser, setUserData } from '../../store/reducers/authSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Loader from '../../components/Loader';
import { Err } from '../../ts/interfaces/error';

type Props = {
    user: IUser;
    changeProfileHandler: () => void;
}

const validationScema = yup.object({
    nickname: yup.string().min(3, "Nickname is too short").max(20, "Nickname is too long").required(),
    description: yup.string(),
    avatarPath: yup.string(),
})

const Change = ({ user, changeProfileHandler }: Props) => {
    const [selectedFile, setSelectedFile] = useState<File>();
    const [selectedFileUrl, setSelectedFileUrl] = useState('');
    const [updateUser, { isLoading, isError, error, isSuccess }] = useUpdateUserMutation();
    const dispatch = useAppDispatch();

    const gridStyleSM = 'sm:grid sm:grid-cols-quarter sm:gap-x-2';
    const gridStyleXS = 'xs:grid xs:grid-cols-quarter xs:gap-x-2'

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const date = Date.now();
        const fileUrl = URL.createObjectURL(file);

        formik.setFieldValue("avatarPath", date + '-' + file.name)
        setSelectedFileUrl(fileUrl);
        setSelectedFile(file);
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': []
        },
        maxSize: 3840 * 3750,
        onDrop
    });

    const onSubmit = async () => {
        const formData = new FormData();
        formData.append('id', user.id);
        formData.append('nickname', formik.values.nickname);
        formData.append('description', formik.values.description);
        formData.append('avatarPath', formik.values.avatarPath);
        if (selectedFile) {
            formData.append('avatar', selectedFile);
        }

        const res = await updateUser(formData).unwrap();
        dispatch(setUserData(res));
        changeProfileHandler();
    }

    const formik = useFormik({
        initialValues: { nickname: user.nickname, description: user.description, avatarPath: user.avatarPath },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationScema
    })

    if (isLoading) return <Loader />

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='flex flex-col p-2 gap-y-2 max-w-full'>
                {isError ? <div className='text-red-400 text-xs text-center sm:text-left'>{(error as Err).data.message}</div> : <></>}
                <div className={`${gridStyleSM} w-full text-center sm:text-left`}>
                    <div>Nickname:</div>
                    <input
                        type='text'
                        name='nickname'
                        value={formik.values.nickname}
                        className='w-full px-2 dark:text-dark-100'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className={`${gridStyleSM} w-full text-center sm:text-left`}>
                    <div>Description:</div>
                    <input
                        type='text'
                        name='nickname'
                        value={formik.values.description}
                        className='w-full px-2 dark:text-dark-100'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className={`${gridStyleXS} w-full text-center sm:text-left`}>
                    <div className='flex sm:justify-between gap-x-2 items-center justify-center'>
                        <div>Avatar:</div>
                        <div>
                            {selectedFileUrl ? (
                                <img src={selectedFileUrl} alt="avatar" className='w-24 rounded-full h-24 self-center ' />
                            ) : user.avatarPath ? (
                                <img src={`${process.env.REACT_APP_BASE_SERVER_URL}/assets/${user.avatarPath}`} alt="avatar" className='w-24 rounded-full h-24 self-center ' />
                            ) : (
                                <p>
                                    Imagem do estabelecimento
                                </p>
                            )}
                        </div>
                    </div>
                    <div
                        {...getRootProps({
                            className: 'flex-auto border-dashed border-2 h-24 items-center flex justify-center cursor-pointer'
                        })}
                    >
                        <input {...getInputProps()} />
                        <div className='flex flex-col items-center justify-center gap-4'>
                            {isDragActive ? (
                                <p>Drop the files here ...</p>
                            ) : (
                                <p>Drag & drop files here, or click to select files</p>
                            )}
                        </div>

                    </div>
                </div>
                <div className='flex gap-x-2 w-full'>
                    <StyledButton className='w-1/2' functionHandler={changeProfileHandler}>Back</StyledButton>
                    <StyledButton className='w-1/2' type="submit">Save</StyledButton>
                </div>
            </div>
        </form>
    )
}

export default Change;