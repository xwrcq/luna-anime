import React from 'react';
import { GetTopAiringResponse, GetRecentResponse } from '../../ts/interfaces/anime'
import Card from '../../components/Card';
import { useNavigate } from 'react-router-dom';

type Props = {
    data: GetTopAiringResponse | GetRecentResponse;
}

const CardList = ({ data }: Props) => {
    const list = data.results;
    const navigate = useNavigate();

    const onClickHandler = (id: string) => {
        navigate(`info/${id}`);
    }

    return (
        <div className='p-2 border-b-2 flex flex-col gap-y-2 sm:grid sm:grid-cols-2 sm:gap-x-2 md:grid-cols-3'>
            {list.map((el, i) =>
                <Card key={i} id={el.id} image={el.image} title={el.title} functionHandler={() => onClickHandler(el.id)} />
            )}
        </div>
    )
}

export default CardList;