import React, { FC, ReactElement } from 'react';
import { useGetRecentQuery, useGetTopAiringQuery } from '../../services/Anime';
import Carousel from './Carousel';
import { Link } from 'react-router-dom';
import { Pages } from '../../ts/enums/pages';
import PageContainer from '../../components/PageContainer';
import Loader from '../../components/Loader';
import StyledButton from '../../components/StyledButton';
import { useAppSelector } from '../../store';
import { IMiniFriend } from '../../ts/interfaces/user';
import UserFriends from '../../components/UserFriends';
import UsersSection from './UsersSection';
import { motion } from 'framer-motion';

type Props = {}

const Home = (props: Props) => {
  const { data: topAiringData, isLoading } = useGetTopAiringQuery(1);
  const { data: recentData } = useGetRecentQuery();
  const user = useAppSelector(state => state.authSlice.user);

  const TopAiringSection: FC = (): ReactElement => {
    if (!isLoading && topAiringData) {
      return (
        <div className='mt-2 flex flex-col'>
          <motion.div
            className='self-end mb-2'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <StyledButton>
              <Link to={Pages.ANIME_LISTS}>View all</Link>
            </StyledButton>
          </motion.div>
          <Carousel values={topAiringData?.results} />
        </div>
      )
    } else {
      return <Loader />
    }
  }

  const RecentSection: FC = (): ReactElement => {
    if (recentData) {
      return (
        <div className='mt-4'>
          <Carousel values={recentData?.results} />
        </div>
      )
    } else {
      return <Loader />
    }
  }

  return (
    <PageContainer>
      <div>
        <motion.div
          className='text-center'
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}  
        >
          <h2 className='text-xl'>Luna Anime</h2>
          <div>
            Luna is platforms that offer a wide range of anime shows and movies for viewers to watch.
          </div>
        </motion.div>
        <TopAiringSection />
        <RecentSection />
        {user ?
          <div>
            <div className='text-center my-2 text-lg'>Users</div>
            <UsersSection user={user} />
          </div>
          : <></>}
      </div>
    </PageContainer>
  )
}

export default Home;