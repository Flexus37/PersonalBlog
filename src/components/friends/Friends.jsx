import { motion, AnimatePresence } from 'framer-motion';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import profileAvatar from '../../resources/img/profile-avatar.jpg';
import './friends.scss';

const Friends = () => {


    return (
        <>
            <h1 className="page__title">Мои друзья</h1>

            <div className="friend">
                <img src={profileAvatar} alt="Аватарка друга" className="friend__avatar" />
                <h2 className='friend__name'>Дудин Алексей</h2>
            </div>
        </>
    )
}

export default Friends;
