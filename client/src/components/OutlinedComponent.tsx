import React from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
}

const OutlinedComponent = ({ children, className }: Props) => {
    return (
        <div className={`border-2 border-black dark:border-white rounded-md p-2 ${className ? className : ''}`}>
            {children}
        </div>
    )
}

export default OutlinedComponent;