import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import profileAvatar from '../../resources/img/profile-avatar.jpg';
import './friends.scss';

const Friends = () => {
    const [searchInput, setSearchInput] = useState('');


    // const renderLinks = (links) => {
    //     if (!links || links.length === 0) {
    //         return null;
    //     }

    //     return links.map(item => {
    //         return (
    //             <li key={item.value} className="social__item">
    //                 <a className="social__link" href={item.url} target="_blank">
    //                     <Icon className='social__icon' icon={item.value} alt={item.label} />
    //                 </a>
    //             </li>
    //         )
    //     })
    // }

    return (
        <>
            <h1 className="page__title">Все друзья</h1>

            <div className="friends__search">
                <input
                    type="text"
                    placeholder='Поиск друзей'
                    value={searchInput}
                    onInput={(e) => setSearchInput(e.target.value)}
                    />
                {
                    searchInput ?
                    <div className="friends__search-clear">
                        <i
                        className="fa-solid fa-xmark"
                        onClick={() => setSearchInput('')}
                        ></i>
                    </div>
                    : null
                }
            </div>


            <motion.div
                className="friends"
                initial={{opacity: 0, scale: .7}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: .6}}
                transition={{ease: "easeInOut", duration: .6}}
            >
                <img src={profileAvatar} alt="Аватарка друга" className="friends__avatar" />
                <h2 className='friends__name'>Дудин Алексей</h2>
                <ul className="social">
                    {/* {renderLinks(links)} */}
                </ul>
            </motion.div>
        </>
    )
}

export default Friends;
