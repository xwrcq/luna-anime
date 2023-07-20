import React, { useEffect, useState } from 'react';
import PageContainer from '../../components/PageContainer';
import { useGetinfoQuery } from '../../services/Anime';
import { useLocation, useNavigate } from 'react-router-dom';
import Player from './Player';
import { useFavoriteMutation } from '../../services/User';
import { useAppDispatch, useAppSelector } from '../../store';
import { setUser } from '../../store/reducers/authSlice';
import Loader from '../../components/Loader';
import StyledButton from '../../components/StyledButton';

type Props = {}

const AnimeInfo = (props: Props) => {
  const pathname = useLocation().pathname;
  const animeID = pathname.replace('/anime/info/', '');
  const { data, isLoading, isSuccess } = useGetinfoQuery(animeID);
  const [currentEpisode, setCurrentEpisode] = useState('');
  const [favorite, { isLoading: isFavoriteLoading }] = useFavoriteMutation();
  const user = useAppSelector(state => state.authSlice.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setCurrentEpisode(data?.episodes[0].id)
    }
  }, [isLoading]);

  const favoriteHandler = async () => {
    if(!user) navigate('/registration')
    
    if (user && data) {
      const updatedUser = await favorite({ id: user.id, animeId: data.id }).unwrap();
      dispatch(setUser(updatedUser));
    } 
  }

  if (isLoading) {
    return <Loader />;
  }


  return (
    <PageContainer>
      {data &&
        <>
          <div className='flex flex-col-reverse sm:flex-row sm:gap-x-2 gap-y-2 sm:gap-y-0'>
            <div className='mx-auto'>
              <img src={data?.image} alt="img" className='basis-1/3 grow-0 shrink-0 max-w-full' />
              <div className='text-center sm:text-left'>
                {isFavoriteLoading ?
                  <Loader /> :
                  <StyledButton
                    functionHandler={favoriteHandler}
                    className='mt-2' >
                    {user && user?.favoriteAnime.some(anime => anime === data.id) ? 'delete' : 'add'}
                  </StyledButton>
                }

              </div>
            </div>
            <div className='flex flex-col basis-2/3 grow-1 shrink-1 gap-y-2'>
              <div>{data?.title}</div>
              <div>Alternative names: {data?.otherName}</div>
              <div className='flex gap-x-2 flex-wrap'>
                <div>Genres:</div>
                {data && data?.genres.map(genre =>
                  <div>{genre}</div>
                )}
              </div>
              <div className='flex gap-2 flex-wrap'>
                <div>Status: {data?.status}</div>
                <div>Episodes: {data?.totalEpisodes}</div>
                <div>Release Date: {data?.releaseDate}</div>
                <div>Season: {data?.type}</div>
              </div>
              <div className='flex flex-col'>
                <div>Description:</div>
                <div>{data?.description}</div>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center mt-2'>
            <Player episodeId={currentEpisode} image={data.image} />
            <div className='flex gap-2 mt-2 flex-wrap justify-center'>
              {data?.episodes.map(ep =>
                <button
                  className={`px-2 py-2 border-2 border-black rounded-md ${ep.id === currentEpisode ? 'bg-slate-600' : ' bg-slate-200'}`}
                  key={ep.id}
                  onClick={() => setCurrentEpisode(ep.id)}>
                  {ep.number}
                </button>
              )}
            </div>
          </div>
        </>
      }
    </PageContainer>
  )
}

export default AnimeInfo;