import React, { useState } from 'react';
import OutlinedComponent from './OutlinedComponent';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { IMiniFriend } from '../ts/interfaces/user';

type Props = {
    FriendsData: IMiniFriend[] | undefined;
    text: string;
}

const UserFriends = ({ FriendsData, text }: Props) => {
    const [isFriendsOpen, setIsFriendsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <OutlinedComponent>
                <button
                    className='flex items-center w-full justify-center dark:text-white'
                    onClick={() => setIsFriendsOpen(!isFriendsOpen)}
                >
                    {text}
                    <span className='pt-1 inline-block justify-self-end'>
                        {isFriendsOpen ? (
                            <BiChevronUp />
                        ) : (
                            <BiChevronDown />
                        )
                        }
                    </span>
                </button>
            </OutlinedComponent>
            {isFriendsOpen &&
                <div className='flex flex-col items-center dark:text-white'>
                    {FriendsData?.length ?
                        <div className='flex flex-col gap-y-2' >
                            {FriendsData.map((friend, i) =>
                                <div>
                                    <div className='text-center cursor-pointer' onClick={() => navigate(`/users/${friend.id}`)}>
                                        {friend.nickname}
                                    </div>
                                    <img
                                        src={`${process.env.REACT_APP_BASE_SERVER_URL}/assets/${friend?.avatarPath}`}
                                        alt="avatar"
                                        className='w-24 rounded-full h-24 self-center cursor-pointer'
                                        onClick={() => navigate(`/users/${friend.id}`)}
                                    />
                                </div>
                            )}
                        </div>
                        :
                        <div className='text-center'>No {text}</div>
                    }
                </div>
            }
        </>

    )
}

export default UserFriends;