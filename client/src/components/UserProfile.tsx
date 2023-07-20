import React from 'react'

type Props = {
    children: React.ReactNode;
}

const UserProfile = ({ children }: Props) => {
    
  return (
    <div className='sm:flex gap-x-4 py-2 max-w-full min-h-full'>
        {children}
    </div>
  )
}

export default UserProfile