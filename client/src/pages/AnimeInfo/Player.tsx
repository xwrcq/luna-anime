import React, { useEffect, useRef, useState } from 'react';
import { useGetStreamingLinkQuery } from '../../services/Anime';
import Loader from '../../components/Loader';
import ReactPlayer from 'react-player';

type Props = {
  episodeId: string;
  image: string;
}

const Player = ({ episodeId, image }: Props) => {
  const { data, isLoading, isSuccess, isFetching } = useGetStreamingLinkQuery(episodeId);

  if (isLoading || isFetching) {
    return <Loader />
  }

  return (
    <div className='max-w-full'>
      {data && 
        <ReactPlayer 
        url={data.sources.find(s => s.quality === 'default')?.url || data.sources[0].url}
        controls    
        width={'100%'}  
        height={'auto'}  
        />
      }
    </div>
  )
}

export default Player;