import React, { useRef } from 'react';
import { RecentInfo, TopAiringInfo } from '../../ts/interfaces/anime';
import { Swiper as SwiperType, Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

type Props = {
  values: TopAiringInfo[] | RecentInfo[]
}

const Carousel = ({ values }: Props) => {
  const navigate = useNavigate();
  const swiperRef = useRef<SwiperType>();

  return (
    <div>
      <Swiper
        modules={[Navigation, Autoplay, Scrollbar]}
        className=' h-72'
        spaceBetween={10}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          // when window width is >= 640px
          480: {
            //width: 480,
            slidesPerView: 2,
          },
          // when window width is >= 768px
          768: {
            //width: 768,
            slidesPerView: 3,
          },
          1060: {
            // width: 1060,
            slidesPerView: 5,
          },
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {values.map(value =>
          <SwiperSlide
            key={value.id}
            id={value.id}
            style={{ backgroundImage: `url(${value.image})` }}
            className='bg-center bg-cover cursor-pointer max-w-full rounded-md'
            onClick={() => navigate(`anime/info/${value.id}`)}
          >
            <div className='absolute bottom-0 bg-light-600 dark:bg-dark-500 w-[calc(100%_-_1rem)] text-center mx-2 rounded-md'>
              {value.title}
            </div>
          </SwiperSlide>
        )}
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
  )
}

export default Carousel;