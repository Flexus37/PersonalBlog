import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useParams } from 'react-router-dom';
import { useGetUserInfoQuery } from '../../services/api/apiSlice';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux'

import ContactModal from '../modals/ContactModal';

import './sidebar.scss';

import defaultAvatarImage from '../../resources/img/profile/default-avatar.jpg';
import defaultPreviewProfileImage from '../../resources/img/profile/default-preview-profile-image.jpg';

const Sidebar = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [profession, setProfession] = useState('');
    const [about, setAbout] = useState('');
    const [links, setLinks] = useState([]);
    const [avatarImage, setAvatarImage] = useState({
        id: 'defaultImageAvatar',
        file: defaultAvatarImage
    });
    const [profilePreviewImage, setProfilePreviewImage] = useState({
        id: 'defaultPreviewProfileImage',
        file: defaultPreviewProfileImage
    });
    const [showModal, setShowModal] = useState(false);

    const {userId, currentPageId, isSidebarOpened} = useSelector(state => state.userInfo);

    const {
        data: userInfo,
        isLoading,
        isError
    } = useGetUserInfoQuery(userId);


    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1));
            setSurname(userInfo.surname.charAt(0).toUpperCase() + userInfo.surname.slice(1));
            setProfession(userInfo.profession);
            setAbout(userInfo.about);
            setLinks(userInfo.links);
            setAvatarImage({
                id: userInfo.avatarImage.id,
                file: userInfo.avatarImage.url
            });
            setProfilePreviewImage({
                id: userInfo.profilePreviewImage.id,
                file: userInfo.profilePreviewImage.url
            })
        }
    }, [userInfo])

    const onHandleShowModal = () => {
        setShowModal(true);
        document.body.style.overflow = 'hidden';
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

    return (
        <aside className={isSidebarOpened ? 'sidebar show-sidebar' : 'sidebar'} id="sidebar">
            {
                showModal ?
                createPortal(
                    <ContactModal closeModal={() => setShowModal(false)} />,
                    document.body
                ) :
                null
            }
            <div className="sidebar__header">
                <img src={profilePreviewImage.file} alt="Sidebar header image"/>
            </div>

            <div className="sidebar__content">
                <div className="profile">
                    <img className="profile__avatar" src={avatarImage.file} alt="User avatar image"/>
                    <div className="profile__header">
                        <div className="profile__name">{`${name} ${surname}`}</div>
                        <div className="profile__prof">{profession}</div>
                    </div>

                    <ul className="social">
                        {renderLinks(links)}
                    </ul>

                    <div className={`profile__text${about?.length === 0 ? ' empty' : ''}`}>
                        <p>{about}</p>
                    </div>
                </div>
                <nav className="nav nav--mobile">
                    <ul className="nav__list">
                        <li className="nav__item">
                            <a className="nav__link" href="/index.html">Главная</a>
                        </li>
                        <li className="nav__item">
                            <a className="nav__link has-subnav" href="#">Статьи</a>

                            <ul className="subnav">
                                <li>
                                    <a className="subnav__link" href="#">Создание сайтов</a>
                                </li>
                                <li>
                                    <a className="subnav__link" href="#">Интернет-маркетинг</a>
                                </li>
                                <li>
                                    <a className="subnav__link" href="#">Продвижение видео</a>
                                </li>
                            </ul>

                        </li>
                        <li className="nav__item">
                            <a className="nav__link" href="/text.html">Обо мне</a>
                        </li>
                        <li className="nav__item">
                            <a className="nav__link" href="/text.html">Реклама</a>
                        </li>
                        <li className="nav__item">
                            <a className="nav__link" href="/profile.html">Профиль</a>
                        </li>
                        <li className="nav__item">
                            <a className="nav__link" href="#">Выйти</a>
                        </li>
                    </ul>
                </nav>

            </div>

            <div className="sidebar__footer">
                {/* <a className="btn btn--red" href="/works.html">Мои работы</a> */}
                <Link className="btn btn--red" to={`/works/${currentPageId}`}>Мои работы</Link>
                <button
                    className="btn btn--blue"
                    type="button"
                    data-modal="contact-modal"
                    onClick={onHandleShowModal}>Написать мне</button>
            </div>
        </aside>
    );
}

export default Sidebar;