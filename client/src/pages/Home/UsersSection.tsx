import React, { useRef } from 'react'
import { IUser } from '../../ts/interfaces/user'
import { useGetUsersQuery } from '../../services/User';
import Loader from '../../components/Loader';
import UserFriends from '../../components/UserFriends';
import { Swiper as SwiperType, Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useNavigate } from 'react-router-dom';

type Props = {
    user: IUser;
}

const UsersSection = ({ user }: Props) => {
    const { data, isLoading } = useGetUsersQuery(user.id);
    const swiperRef = useRef<SwiperType>();
    const navigate = useNavigate();

    if (isLoading) return <Loader />;

    return (
        <>
            {data &&
                <div>
                    <Swiper
                        modules={[Navigation, Autoplay, Scrollbar]}
                        className='h-32'
                        spaceBetween={3}
                        slidesPerView={2}
                        autoplay={{
                            delay: 1500,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            // when window width is >= 640px
                            480: {
                                //width: 480,
                                slidesPerView: 3,
                            },
                            // when window width is >= 768px
                            768: {
                                //width: 768,
                                slidesPerView: 4,
                            },
                            1060: {
                                // width: 1060,
                                slidesPerView: 6,
                            },
                        }}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                    >

                        {data.map((friend, i) =>
                            <SwiperSlide
                                key={friend.id}
                                id={friend.id}
                                className='bg-center bg-cover cursor-pointer max-w-full rounded-md'
                                onClick={() => navigate(`users/${friend.id}`)}
                            >
                                <div className=' flex flex-col '>
                                    <img
                                        src={`${process.env.REACT_APP_BASE_SERVER_URL}/assets/${friend?.avatarPath}`}
                                        alt="avatar"
                                        className='w-24 rounded-full h-24 self-center cursor-pointer'
                                        onClick={() => navigate(`/users/${friend.id}`)}
                                    />
                                    <div className='text-center cursor-pointer' onClick={() => navigate(`/users/${friend.id}`)}>
                                        {friend.nickname}
                                    </div>
                                </div>
                            </SwiperSlide>
                        )}

                        {/* {data.map(value =>
                            <SwiperSlide
                                key={value.id}
                                id={value.id}
                                className='bg-center bg-cover cursor-pointer max-w-full rounded-md'
                                onClick={() => navigate(`users/${value.id}`)}
                            >
                                <div className='absolute bottom-0 bg-light-600 dark:bg-dark-500 w-[calc(100%_-_1rem)] text-center mx-2 rounded-md'>
                                    {value.title}
                                </div>
                            </SwiperSlide>
                        )} */}
                    </Swiper>
                    <div className='flex justify-between mt-2'>
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className='
            border-2 
          border-black 
          dark:border-white 
            rounded-full 
            p-2 
          bg-light-600 
            duration-500
          hover:bg-light-500 
          dark:bg-dark-500
          dark:hover:bg-dark-400
            '
                        >
                            <HiOutlineChevronLeft />
                        </button>
                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className='
            border-2 
          border-black 
          dark:border-white 
            rounded-full 
            p-2 
          bg-light-600 
            duration-500
          hover:bg-light-500 
          dark:bg-dark-500
          dark:hover:bg-dark-400
            '
                        >
                            <HiOutlineChevronRight />
                        </button>
                    </div>
                </div>
            }
        </>
    )
}

export default UsersSection;