import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useGetAllContentQuery, useDeleteContentMutation, useGetUsersQuery, useSendFriendRequestMutation } from '../../services/api/apiSlice';
import debounce from 'lodash.debounce';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

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

    const {
        data: users = [],
        isLoading: isUsersLoading,
        isError: isUsersError
    } = useGetUsersQuery(debouncedSearchTerm);

    const [
        sendFriendRequest,
        {
            isLoading: isFriendRequestSending,
            isError: isFriendRequestError,
            isSuccess: isFriendRequestSuccess
        }
    ] = useSendFriendRequestMutation();

    const [
        deleteContent,
        {
            isLoading: isDeleting,
            isError: isDeletingError,
            isSuccess: isDeletingSuccess
        }
    ] = useDeleteContentMutation();

    const debouncedOnChange = useCallback(
        debounce((search) => {
          setDebouncedSearchTerm(search);
          console.log(search);
        }, 500),
        []
    );

    useEffect(() => {
        if (searchInput) {
          debouncedOnChange(searchInput.trim().toLowerCase());
        }
    }, [searchInput, debouncedOnChange]);

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

        const items = data.map(item => {
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
        });

        return (
            <div className="friends">
                {items}
            </div>
        )
    }

    const renderGlobalUsers = (users) => {
        if (users.length === 0) {
            return null;
        }

        const items = users.filter(user => user.id !== userId).map(user => {
            return (
                <motion.div
                    key={user.id}
                    className="friends__item"
                    initial={{opacity: 0, scale: .7}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: .6}}
                    transition={{ease: "easeInOut", duration: .6}}
                >
                    <img src={user.avatarImage.url} alt="Аватарка друга" className="friends__avatar" />
                    <h2 className='friends__name'>
                        {
                            `${user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                            ${user.surname.charAt(0).toUpperCase() + user.surname.slice(1)}`
                        }
                    </h2>
                    <ul className="social">
                        {renderLinks(user.links)}
                    </ul>
                    <i onClick={() => sendFriendRequest({senderId: userId, receiverId: user.id})} className="fa-solid fa-user-plus"></i>
                </motion.div>
            )
        })

        // console.log(items);

        return (
            <div className="friends">
                {items}
            </div>
        )
    }

    // console.log(users);

    return (
        <>
            <div className="friends__header">
                <h1 className="page__title">Все друзья</h1>
                <Link to='/friends/requests'>
                    <i className="fa-solid fa-bell"></i>
                </Link>
            </div>

            <div className="friends__search">
                <input
                    type="text"
                    placeholder='Поиск друзей'
                    value={searchInput}
                    onInput={(e) => setSearchInput(e.target.value)}
                />
                <div className="friends__search-clear">
                    {
                        searchInput ? (
                            isUsersLoading ?
                            <Spinner /> :
                            <i className="fa-solid fa-xmark"
                            onClick={() => {
                                setSearchInput('');
                                setDebouncedSearchTerm('');
                            }}></i>
                        ) : null
                    }
                </div>
                <button className='friends__search-btn' type='button' >
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>

            <AnimatePresence>
                {renderFriends(friends)}

                {users.length !== 0 ? (
                    <motion.h2
                        key='second-title'
                        className="page__title"
                        initial={{opacity: 0, scale: .7}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: .6}}
                        transition={{ease: "easeInOut", duration: .6}}
                    >Другие пользователи</motion.h2>
                ) : null}

                {renderGlobalUsers(users)}
            </AnimatePresence>

        </>
    )
}

export default Friends;
