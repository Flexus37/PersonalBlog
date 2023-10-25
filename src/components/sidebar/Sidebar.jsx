import { Link } from 'react-router-dom';

import './sidebar.scss';

import profileAvatar from '../../resources/img/profile-avatar.jpg';
import sidebarHeader from '../../resources/img/sidebar-header.jpg';
import instagram from '../../resources/img/instagram.svg';
import vk from '../../resources/img/vk.svg';
import pinterest from '../../resources/img/pinterest.svg';

const Sidebar = () => {

    return (
        <aside className="sidebar" id="sidebar">
            <div className="sidebar__header">
                <img src={sidebarHeader} alt=""/>
            </div>

            <div className="sidebar__content">
                <div className="profile">
                    <img className="profile__avatar" src={profileAvatar} alt=""/>
                    <div className="profile__header">
                        <div className="profile__name">Алексей Дудин</div>
                        <div className="profile__prof">блог front-end разработчика</div>
                    </div>

                    <ul className="social">
                        <li className="social__item">
                            <a className="social__link" href="#" target="_blank">
                                <img src={instagram} alt="Instagram Алексей Дудин"/>
                            </a>
                        </li>
                        <li className="social__item">
                            <a className="social__link" href="#" target="_blank">
                                <img src={vk} alt="ВКонтакте Алексей Дудин"/>
                            </a>
                        </li>
                        <li className="social__item">
                            <a className="social__link" href="#" target="_blank">
                                <img src={pinterest} alt="Pinterest Алексей Дудин"/>
                            </a>
                        </li>
                    </ul>

                    <div className="profile__text">
                        <p>Front-end разработчик. Практик верстки сайтов. Созданием сайтов занимаюсь с 2012 года. Работал в нескольких ИТ компаниях и наработал более 10 000 часов в создании сайтов различной сложности.</p>
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
                <Link className="btn btn--red" to='/works'>Мои работы</Link>
                <button className="btn btn--blue" type="button" data-modal="contact-modal">Написать мне</button>
            </div>
        </aside>
    );
}

export default Sidebar;