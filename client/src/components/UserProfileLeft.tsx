import React from 'react'
import useMediaQuery from '../hooks/useMediaQuery';

type Props = {
  children: React.ReactNode;
}

const UserProfileLeft = ({ children }: Props) => {

  return (
    <div className='sm:max-w-[40%] sm:min-w-[20%] sm:mb-0 mb-2 flex flex-col gap-y-2'>
        { children }
    </div >
  )
}

export default UserProfileLeft