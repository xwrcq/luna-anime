import React from 'react'

type Props = {
  children: React.ReactNode;
  classStyles?: string;
}

const PageContainer = ({ children, classStyles }: Props) => {
  return (
    <div className={`mx-auto px-2 py-4 h-full dark:bg-dark-200 dark:text-light-400 ${classStyles ? classStyles : ''}`}>
      {children}
    </div>
  )
}

export default PageContainer