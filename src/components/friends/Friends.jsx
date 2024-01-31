import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useGetAllContentQuery, useDeleteContentMutation, useGetUsersQuery } from '../../services/api/apiSlice';
import debounce from 'lodash.debounce';
import { Icon } from '@iconify/react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import profileAvatar from '../../resources/img/profile-avatar.jpg';
import './friends.scss';

const Friends = () => {
    const [searchInput, setSearchInput] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchInput);

    const {userId} = useSelector(state => state.userInfo);

    const {
        data: friends = [],
        isLoading: isDataLoading,
        isError: isDataError
    } = useGetAllContentQuery({userId, contentType: 'friends'})

    // const {
    //     data: users = [],
    //     isLoading: isUsersLoading,
    //     isError: isUsersError
    // } = useGetUsersQuery()

    const [
        deleteContent,
        {
            isLoading: isDeleting,
            isError: isDeletingError,
            isSuccess: isDeletingSuccess
        }
    ] = useDeleteContentMutation();

    const renderLinks = (links) => {
        if (!links || links.length === 0) {
            return null;
        }

        return links.map(item => {
            return (
                <li key={item.value} className="social__item">
                    <a className="social__link" href={item.url} target="_blank">
                        <Icon className='social__icon' icon={item.value} alt={item.label} />
                    </a>
                </li>
            )
        })
    }

    const renderFriends = (data) => {
        if (!data || data.length === 0) {
            return null;
        }

        return data.map(item => {
            return (
                <motion.div
                    key={item.id}
                    className="friends__item"
                    initial={{opacity: 0, scale: .7}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: .6}}
                    transition={{ease: "easeInOut", duration: .6}}
                >
                    <img src={item.avatarImage.url} alt="Аватарка друга" className="friends__avatar" />
                    <h2 className='friends__name'>{`${item.name} ${item.surname}`}</h2>
                    <ul className="social">
                        {renderLinks(item.links)}
                    </ul>
                    <i className="fa-solid fa-user-xmark"></i>
                </motion.div>
            )
        })
    }

    const renderGlobalUsers = (users) => {

    }

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
                <button className='friends__search-btn' type='button' >
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>


            <div className="friends">
                <motion.div
                    className="friends__item"
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
                    <i className="fa-solid fa-user-xmark"></i>
                </motion.div>
            </div>

            <h2 className="page__title">Другие пользователи</h2>

        </>
    )
}

export default Friends;
