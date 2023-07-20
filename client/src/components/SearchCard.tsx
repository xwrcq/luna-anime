import React from 'react';

type Props = {
    id: string;
    image: string;
    title: string;
    releaseDate: string;
    functionHandler?: (id: string) => void;
}

const SearchCard = ({ id, image, title, releaseDate, functionHandler }: Props) => {
    const onClickHandler = () => {
        if(functionHandler) {
            functionHandler(id)
        }
    }

    return (
        <div
            id={id}
            className='flex cursor-pointer gap-x-2 p-2'
            onClick={onClickHandler}
        >
            <img src={image} alt="image" className='max-h-32' />
            <div className='flex flex-col'>
                <div>{title}</div>
                <div>{releaseDate}</div>
            </div>
        </div>
    )
}

export default SearchCard;