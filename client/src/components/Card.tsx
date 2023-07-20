import React from 'react';
import { motion } from 'framer-motion';

type Props = {
    id: string;
    image: string;
    title: string;
    functionHandler?: () => void;
}

const Card = ({ id, image, title, functionHandler}: Props) => {
  return (
    <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5 }}
    variants={{
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    }}
    >
      <div 
      id={id}
      style={{ backgroundImage: `url(${image})` }} 
      className='bg-center bg-cover cursor-pointer max-w-full h-60 rounded-md mt-2 min-w-[200px] xs:h-96'
      onClick={functionHandler}
      >          
      </div>
      <div className='text-center'>{title}</div>
    </motion.div>
  )
}

export default Card;