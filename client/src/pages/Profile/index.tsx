import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import PageContainer from '../../components/PageContainer';
import { logout } from '../../store/reducers/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useGetAcceptRequestsQuery, useGetFriendsQuery, useGetSendRequestsQuery, userApi } from '../../services/User';
import { useFetchLogoutMutation } from '../../services/Auth';
import { IUser } from '../../ts/interfaces/user';
import StyledButton from '../../components/StyledButton';
import UserProfile from '../../components/UserProfile';
import UserProfileLeft from '../../components/UserProfileLeft';
import UserFriends from '../../components/UserFriends';
import UserMain from '../../components/UserMain';
import Dropzone from 'react-dropzone';
import Change from './Change';

type Props = {}

const Profile = (props: Props) => {
  const user = useAppSelector(state => state.authSlice.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [fetchLogout] = useFetchLogoutMutation();
  const { data: FriendsData, isLoading: isFriendsDataLoading, isSuccess: isFriendsDataSuccess } = useGetFriendsQuery((user as IUser).id);
  const { data: SendsData, isLoading: isSendsDataLoading, isSuccess: isSendsDataSuccess } = useGetSendRequestsQuery((user as IUser).id);
  const { data: AcceptsData, isLoading: isAcceptsDataLoading, isSuccess: isAcceptsDataSuccess } = useGetAcceptRequestsQuery((user as IUser).id);
  const [isChanging, setIsChanging] = useState(false);

  const [nickname, setNickname] = useState<string>((user as IUser).nickname);
  const [description, setDescription] = useState<string>((user as IUser).description);
  const [avatar, setAvatar] = useState<string>((user as IUser).avatarPath);

  const changeProfileHandler = () => {
    setIsChanging(!isChanging);
  }

  const logoutHandler = async () => {
    await fetchLogout();
    dispatch(logout());
    navigate('/');
  }

  if (!user) {
    return <div>error</div>
  }

  return (
    <PageContainer>
      {!isChanging ? (
        <UserProfile>
          <UserProfileLeft>
            <img src={`${process.env.REACT_APP_BASE_SERVER_URL}/assets/${user.avatarPath}`} alt="avatar" className='w-24 rounded-full h-24 self-center ' />
            <UserFriends FriendsData={FriendsData} text='Friends' />
            <UserFriends FriendsData={SendsData} text='Send Friends Requsts' />
            <UserFriends FriendsData={AcceptsData} text='Accept Friends Requsts' />
            <StyledButton functionHandler={changeProfileHandler}>
              Edit profile
            </StyledButton>
            <StyledButton functionHandler={logoutHandler}>
              logout
            </StyledButton>
          </UserProfileLeft>
          <UserMain user={user} userID={user.id} />
        </UserProfile>
      ) : (
        <Change user={user} changeProfileHandler={changeProfileHandler} />
      )}
    </PageContainer>
  )
}

export default Profile;