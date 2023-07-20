import React from 'react'
import { MutatingDots } from 'react-loader-spinner';

type Props = {}

const Loader = (props: Props) => {
    return (
        <div className='w-full mx-auto flex justify-center h-full items-center'>
            <MutatingDots
                height="100"
                width="100"
                color="#fb8f41"
                secondaryColor='#a663f2'
                radius='12.5'
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default Loader;