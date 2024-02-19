import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useDeleteContentMutation, useGetFriendRequestsQuery, useAcceptFriendRequestMutation, useRejectFriendRequestMutation, useGetFriendRequestsCountQuery } from "../../services/api/apiSlice";
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import fixUserName from "../../services/fixUserName";
import { Link, NavLink } from 'react-router-dom';


import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './friends.scss';

const FriendRequestList = () => {

    const {userId} = useSelector(state => state.userInfo);

    const {
        data: friendRequestsCount = 0
    } = useGetFriendRequestsCountQuery(userId);

    const {
        data: friendRequests = [],
        isLoading: isFriendRequestsLoading,
        isError: isFriendRequestsError
    } = useGetFriendRequestsQuery(userId)

    const [
        acceptFriendRequest,
        {
            isLoading: isAcceptingFriendRequest,
            isError: isErrorAcceptFriendRequest
        }
    ] = useAcceptFriendRequestMutation();

    const [
        rejectFriendRequest,
        {
            isLoading: isRejectingFriendRequest,
            isError: isErrorRejectFriendRequest
        }
    ] = useRejectFriendRequestMutation()

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

    const renderFriendRequests = (data) => {
        if (isFriendRequestsLoading) {
            return <Spinner lottiestyle={{'height': '300px'}} />;
        } else if (!data || data.length === 0) {
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
                    <h2 className='friends__name'>{fixUserName(item.name, item.surname)}</h2>
                    <ul className="social">
                        {renderLinks(item.links)}
                    </ul>
                    <div className="friends__btns">
                        <i onClick={() => acceptFriendRequest({userId, friendId: item.id, friendInfo: item, requestId: item.requestId})} className="fa-solid fa-check"></i>
                        <i onClick={() => rejectFriendRequest(item.requestId)} className="fa-solid fa-xmark"></i>
                    </div>
                </motion.div>
            )
        });

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

            <AnimatePresence>
                {renderFriendRequests(friendRequests)}
            </AnimatePresence>
        </>

    )
}

export default FriendRequestList;