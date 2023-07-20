import React, { useEffect, useState } from 'react';
import CardList from './CardList';
import { useGetTopAiringQuery } from '../../services/Anime';

type Props = {}

const AnimeLists = (props: Props) => {
    const [page, setPage] = useState(1);
    const { data: topAiringData, isFetching } = useGetTopAiringQuery(page);    

    useEffect(() => {
        const onScroll = () => {
          const scrolledToBottom =
            window.innerHeight + window.scrollY >= document.body.offsetHeight;
          if (scrolledToBottom && !isFetching) {
            setPage(page + 1);
          }
        };
    
        document.addEventListener("scroll", onScroll);
    
        return function () {
          document.removeEventListener("scroll", onScroll);
        };
      }, [page, isFetching]);

    return (
        <div className='w-5/6  mx-auto dark:bg-slate-900 dark:text-white'>
            {topAiringData &&
                <CardList data={topAiringData} />
            }
        </div>
    )
}

export default AnimeLists;