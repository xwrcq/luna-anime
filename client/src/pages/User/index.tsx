import React, { useEffect, useState } from 'react';
import PageContainer from '../../components/PageContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAcceptFriendRequestMutation, useDeleteFriendMutation, useGetCustomerQuery, useLazyGetFriendsQuery, useSendFriendRequestMutation, userApi, useCancelSendFriendRequestMutation } from '../../services/User';
import { useAppDispatch, useAppSelector } from '../../store';
import { IMiniFriend } from '../../ts/interfaces/user';
import { setUser } from '../../store/reducers/authSlice';
import UserProfile from '../../components/UserProfile';
import UserProfileLeft from '../../components/UserProfileLeft';
import UserFriends from '../../components/UserFriends';
import StyledButton from '../../components/StyledButton';
import UserMain from '../../components/UserMain';

type Props = {}

const User = (props: Props) => {
    const pathname = useLocation().pathname;
    const userID = pathname.replace('/users/', '');
    const user = useAppSelector(state => state.authSlice.user);
    const navigate = useNavigate();
    if (user && user.id === userID) navigate('/profile');
    const { data, isLoading, isSuccess } = useGetCustomerQuery(userID);
    const dispatch = useAppDispatch();
    const [formattedFriends, setFormattedFriends] = useState<IMiniFriend[]>([]);
    const [sendFriendRequest] = useSendFriendRequestMutation();
    const [acceptRequest] = useAcceptFriendRequestMutation();
    const [deleteFriend] = useDeleteFriendMutation();
    const [cancelSendFriendRequest] = useCancelSendFriendRequestMutation();
    const [getFriends, { data: lazyFriendsData, isLoading: lazyfriendsLoading, isSuccess: lazyfriendsSuccess }, refetch] = useLazyGetFriendsQuery();

    useEffect(() => {
        if (lazyfriendsSuccess) {
            if (lazyFriendsData) {
                setFormattedFriends(lazyFriendsData);
            } else {
                setFormattedFriends([]);
            }

        }
    }, [lazyFriendsData])

    useEffect(() => {
        const asFunck = async () => {
            if (data) {
                const r = getFriends(data.id).unwrap();
            }
        }

        asFunck()

    }, [data])

    const friendRequestHandler = async () => {
        if (!user || !data) return;

        if (user.friends.includes(data.id as never)) {
            const res = await deleteFriend({ id: user.id, friendId: data.id }).unwrap();
            dispatch(setUser(res));
            return;
        }

        if (user.acceptRequest.includes(data.id as never)) {
            const res = await acceptRequest({ id: user.id, friendId: data.id }).unwrap();
            dispatch(setUser(res));
            return;
        }

        if (user.sendRequest.includes(data.id as never)) {
            const res = await cancelSendFriendRequest({ id: user.id, friendId: data.id }).unwrap();
            dispatch(setUser(res));
            return;
        } else {
            const res = await sendFriendRequest({ id: user.id, friendId: data.id }).unwrap();
            dispatch(setUser(res));
        }
    }

    if (isLoading) {
        return <div>loading...</div>;
    }

    return (
        <PageContainer>
            {data ?
                <>
                    <UserProfile>
                        <UserProfileLeft>
                            <img src={`${process.env.REACT_APP_BASE_SERVER_URL}/assets/${data.avatarPath}`} alt="avatar" className='w-24 rounded-full h-24 self-center ' />
                            <div className='text-center'>{data.nickname}</div>
                            <UserFriends FriendsData={lazyFriendsData} text='Friends' />
                            {user && (user.friends.includes(data.id as never) ?
                                <StyledButton functionHandler={friendRequestHandler}>delete friend</StyledButton>
                                : user.sendRequest.includes(data.id as never) ?
                                    <StyledButton functionHandler={friendRequestHandler}>cancel friend request</StyledButton>
                                    : user.acceptRequest.includes(data.id as never) ?
                                        <StyledButton functionHandler={friendRequestHandler}>accept friend request</StyledButton>
                                        : <StyledButton functionHandler={friendRequestHandler} >add to friends</StyledButton>
                            )}
                        </UserProfileLeft>
                        <UserMain user={data} userID={userID} />
                    </UserProfile>
                </>
                :
                <div>loading</div>
            }
        </PageContainer>
    )
}

export default User;