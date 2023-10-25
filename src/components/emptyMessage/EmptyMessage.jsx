import Lottie from 'lottie-react';
import lottieImg from './Astronaut.json';
import { motion } from 'framer-motion';

import './emptyMessage.scss';

const EmptyMessage = () => {

    return (
        <motion.div
            initial={{opacity: 0, scale: .7}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: .6}}
            transition={{ease: 'easeInOut', duration: .5}}
        >
            <Lottie animationData={lottieImg} loop={true} />
            <div className='empty'>
                <h1 className='empty__title'>Посты пока отсутствуют :(</h1>
                <p className='empty__subtitle'>Добавьте пост и исправьте это!</p>
            </div>
        </motion.div>
    )
}

export default EmptyMessage;