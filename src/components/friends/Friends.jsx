import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPageId } from '../../services/api/userInfoSlice';
import { useGetAllContentQuery, useRemoveFromFriendsMutation, useGetUsersQuery, useSendFriendRequestMutation, useGetFriendRequestsCountQuery, useGetRequestsToUsersQuery } from '../../services/api/apiSlice';
import debounce from 'lodash.debounce';
import { Icon } from '@iconify/react';
import { Link, NavLink } from 'react-router-dom';
import fixUserName from '../../services/fixUserName';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './friends.scss';

const Friends = () => {
    const [searchInput, setSearchInput] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchInput);

    const {userId} = useSelector(state => state.userInfo);
    const dispatch = useDispatch();

    const {
        data: friends = [],
        isLoading: isFriendsLoading,
        isError: isFriendsError
    } = useGetAllContentQuery({userId, contentType: 'friends'})

    const {
        data: users = [],
        isLoading: isUsersLoading,
        isError: isUsersError
    } = useGetUsersQuery(debouncedSearchTerm);

    const {
        data: requestsToUsers = []
    } = useGetRequestsToUsersQuery(userId);

    const {
        data: friendRequestsCount = 0
    } = useGetFriendRequestsCountQuery(userId);

    const [
        sendFriendRequest,
        {
            isLoading: isFriendRequestSending,
            isError: isFriendRequestError,
            isSuccess: isFriendRequestSuccess
        }
    ] = useSendFriendRequestMutation();

    const [
        removeFromFriends,
        {
            isLoading: isDeleting,
            isError: isDeletingError,
            isSuccess: isDeletingSuccess
        }
    ] = useRemoveFromFriendsMutation();

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

    const onHandleSendFriendRequest = (receiverId) => {

    }

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
        if (isFriendsLoading) {
            return <Spinner lottiestyle={{'height': '300px'}} />;
        }

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
                    <Link onClick={() => dispatch(setCurrentPageId(item.id))} to={`/blog/${item.id}`} className='friends__name'>{fixUserName(item.name, item.surname)}</Link>
                    <ul className="social">
                        {renderLinks(item.links)}
                    </ul>
                    <i onClick={() => removeFromFriends({userId, friendId: item.id})} className="fa-solid fa-user-xmark"></i>
                </motion.div>
            )
        });

        return (
            <div key='friends' className="friends">
                {items}
            </div>
        )
    }

    const renderGlobalUsers = (users) => {
        if (users.length === 0) {
            return null;
        }

        const friendsIds = friends.map(friend => friend.id);

        const items = users.filter(user => user.id !== userId && !friendsIds.includes(user.id)).map(user => {
            // console.log(userSendedRequests, user.id);

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
                    <Link onClick={() => dispatch(setCurrentPageId(user.id))} to={`/blog/${user.id}`} className='friends__name'>{fixUserName(user.name, user.surname)}</Link>
                    <ul className="social">
                        {renderLinks(user.links)}
                    </ul>
                    {
                        requestsToUsers.some(request => request.receiverId === user.id)
                        ? <Icon className='friends__requests-sended' icon="bi:send-check"/>
                        : <i onClick={() => sendFriendRequest({senderId: userId, receiverId: user.id})} className="fa-solid fa-user-plus"></i>
                    }
                </motion.div>
            )
        })

        return (
            <div className="friends">
                {items}
            </div>
        )
    }

    return (
        <>
            <div className="friends__header">
                <NavLink to='/friends' end className={({isActive}) =>
                        isActive ? 'friends__title active' : 'friends__title'
                    }>Все друзья</NavLink>
                <NavLink to='/friends/requests' className={({isActive}) =>
                        isActive ? 'friends__requests active' : 'friends__requests'
                    }>
                    <h2>Заявки</h2>
                    <i className="fa-solid fa-bell"></i>
                    {
                        friendRequestsCount !== 0 &&
                        friendRequestsCount !== null ?
                        <p className="friends__requests-count">{friendRequestsCount}</p> :
                        null
                    }
                </NavLink>
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
