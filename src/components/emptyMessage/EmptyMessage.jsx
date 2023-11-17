import Lottie from 'lottie-react';
import postsImg from './Astronaut.json';
import worksImg from './Lochness.json';
import { motion } from 'framer-motion';

import './emptyMessage.scss';

const EmptyMessage = (props) => {

    return (
        <motion.div
            initial={{opacity: 0, scale: .7}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: .6}}
            transition={{ease: 'easeInOut', duration: .5}}
        >
            <Lottie
            animationData={props.type === 'works' ? worksImg : postsImg}
            loop={true} />
            <div className='empty'>
                <h1 className='empty__title'>
                {
                    props.type === 'works' ?
                    'Работ пока нет :(' :
                    'Посты пока отсутствуют :('
                }
                </h1>
                <p className='empty__subtitle'>
                {
                    props.type === 'works' ?
                    'Если есть работы, то обязательно добавьте их!' :
                    'Добавьте свой первый пост!'
                }
                </p>
            </div>
        </motion.div>
    )
}

export default EmptyMessage;