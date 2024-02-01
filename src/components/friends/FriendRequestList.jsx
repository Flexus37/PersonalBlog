import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useDeleteContentMutation } from "../../services/api/apiSlice";
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './friends.scss';

const FriendRequestList = () => {

    const {userId} = useSelector(state => state.userInfo);

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

    const renderRequests = (data) => {
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
                    <div className="friends__btns">
                        <i class="fa-solid fa-check"></i>
                        <i class="fa-solid fa-xmark"></i>
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
        <h1 className="page__title">Заявки в друзья</h1>

    )
}

export default FriendRequestList;