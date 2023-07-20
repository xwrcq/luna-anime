import React from 'react'

type Props = {
    children: React.ReactNode;
    functionHandler?: () => void | Promise<void>;
    className?: string;
    type?: "button" | "submit" | "reset";
}

const StyledButton = ({ children, functionHandler, className, type }: Props) => {
    const onClickHandler = () => {
        if (functionHandler) {
            functionHandler();
        }
    }

    return (
        <button
            type={type ? type : undefined}
            onClick={onClickHandler}
            className={`
                ${className ? className : ''}
                border-2 
                border-black 
                dark:border-white 
                rounded-md 
                p-2 
                bg-light-600 
                duration-500
                hover:bg-light-500 
                dark:bg-dark-500
                dark:hover:bg-dark-400
                    `}
        >
            {children}
        </button>
    )
}

export default StyledButton;