import React, { useState } from 'react'
import OutlinedComponent from './OutlinedComponent'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import Card from './Card'
import { IFriend, IUser } from '../ts/interfaces/user'
import { useNavigate } from 'react-router-dom'
import StyledButton from './StyledButton'
import { useAddCommentMutation, useGetCommentsQuery, useGetFavoriteQuery } from '../services/User'
import { useAppSelector } from '../store'
import Loader from './Loader';
import { useFormik } from 'formik';
import * as yup from 'yup';

type Props = {
    user: IUser | IFriend | null;
    userID: string;
}

type Values = {
    comment: string;
}

const validationScema = yup.object({
    comment: yup.string().max(100, "Nickname is too long").required(),
})

const UserMain = ({ user, userID }: Props) => {
    const [isFavoriteOpen, setIsFavoriteOpen] = useState(false);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const navigate = useNavigate();
    const [addComment, { isLoading, isSuccess }] = useAddCommentMutation();
    const me = useAppSelector(state => state.authSlice.user);
    const { data: animeData, isLoading: isAnimeDataLoading, isSuccess: isAnimeDataSuccess } = useGetFavoriteQuery((user as IUser).id);
    const { data: comData, isLoading: isComDataLoading, isSuccess: isComDataSuccess } = useGetCommentsQuery((user as IUser).id);

    const onSubmit = async (values: Values) => {
        const { comment } = values;

        if (me && userID) {
            const res = await addComment({
                id: userID,
                commentatorId: me.id,
                commentText: comment
            }).unwrap();
        }

        if (isSuccess) {
            formik.resetForm();
        }
    }

    const favoriteHandler = (id: string) => {
        navigate(`../anime/info/${id}`);
    }

    const formik = useFormik({
        initialValues: { comment: "" },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationScema
    })

    if (isLoading) {
        return <Loader />;
    }

    return (
        <OutlinedComponent className='flex flex-col w-full h-full justify-start'>
            <div className='relative flex justify-between flex-col items-start'>
                <div className=' self-center'>{user?.nickname}</div>
                <div>About me:</div>
                <div className='p-2'>{user?.description ? user?.description : 'No descrpiton yet'}</div>
            </div>
            <div className='relative flex justify-between flex-col items-center'>
                <button
                    className='flex items-center w-full dark:text-white'
                    onClick={() => setIsFavoriteOpen(!isFavoriteOpen)}
                >
                    Favorite anime
                    <span className='pt-1 inline-block justify-self-end'>
                        {isFavoriteOpen ? (
                            <BiChevronUp />
                        ) : (
                            <BiChevronDown />
                        )
                        }
                    </span>
                </button>
                {isFavoriteOpen &&
                    <div className='p-2 flex flex-col gap-y-2 sm:grid sm:grid-cols-2 sm:gap-x-2 md:grid-cols-3 w-full'>
                        {animeData?.length ?
                            <>
                                {animeData.map(fav =>
                                    <Card key={fav.animeId} id={fav.animeId} image={fav.image} title={fav.title} functionHandler={() => favoriteHandler(fav.animeId)} />
                                )}
                            </>
                            :
                            <div>No favorite anime</div>
                        }
                    </div>
                }
            </div>
            <div className='relative flex justify-between flex-col'>
                <button
                    className='flex w-full dark:text-white items-center'
                    onClick={() => setIsCommentsOpen(!isCommentsOpen)}
                >
                    Comments
                    <span className='pt-1 inline-block justify-self-end '>
                        {isCommentsOpen ? (
                            <BiChevronUp />
                        ) : (
                            <BiChevronDown />
                        )
                        }
                    </span>
                </button>
                {isCommentsOpen &&
                    <div className='flex flex-col dark:text-white mt-2'>
                        {comData?.length ?
                            <div>
                                {comData.map((comment, i) =>
                                    <div className='flex gap-x-4'>
                                        <div className='items-center text-center '>
                                            <img
                                                src={`${process.env.REACT_APP_BASE_SERVER_URL}/assets/${comment.commentatorAvatar}`}
                                                alt="commentatorAvatar"
                                                className='h-12 w-12 rounded-full cursor-pointer'
                                                onClick={() => navigate(`/users/${comment.commentatorId}`)}
                                            />
                                            <div className='cursor-pointer' onClick={() => navigate(`/users/${comment.commentatorId}`)}>
                                                {comment.commentatorNickname}:
                                            </div>
                                        </div>
                                        <div className='flex items-center'>{comment.commentText}</div>
                                    </div>
                                )}
                            </div>
                            :
                            <div>No commens</div>
                        }
                        <form onSubmit={formik.handleSubmit}>
                            <div className='flex flex-col w-full mt-2 gap-2 xs:flex-row'>
                                <div className='flex flex-col flex-auto'>
                                    <input
                                        type="text"
                                        name='comment'
                                        className='p-2 rounded-md dark:text-dark-100'
                                        placeholder='add comment'
                                        value={formik.values.comment}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <div className='text-red-400 text-xs'>
                                        {formik.touched.comment && formik.errors.comment ? formik.errors.comment : ''}
                                    </div>
                                </div>
                                <StyledButton type='submit'>add</StyledButton>
                            </div>
                        </form>
                    </div>
                }
            </div>
        </OutlinedComponent>
    )
}

export default UserMain