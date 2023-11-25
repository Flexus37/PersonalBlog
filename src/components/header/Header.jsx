import { NavLink } from 'react-router-dom';

import './header.scss';

const Header = () => {
    return (
        <header className='header'>
            <div className="header__left">
                <nav className="nav">
                    <ul className="nav__list">
                        <li className="nav__item">
                            <NavLink
                                    className={({isActive}) => isActive ?
                                    'nav__link active' : 'nav__link'
                                    }
                                    to='/'
                                    href='#'
                            >Главная</NavLink>
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
                    </ul>
                </nav>

                <button className="burger  active" type="button" id="sidebarToggle">
                    <span>Открыть навигацию</span>
                </button>
            </div>

            <div className="header__right">
                <nav className="nav">
                    <ul className="nav__list">
                        <li className="nav__item">
                            <NavLink
                                className={({isActive}) => isActive ?
                                'nav__link active' : 'nav__link'
                                }
                                to='/profile'
                                href='#'
                            >Профиль</NavLink>
                        </li>
                        <li  className="nav__item">
                            <a className="nav__link" href="#">Выйти</a>
                        </li>
                    </ul>
                </nav>
                <form className="search" action="/search-results" method="get">
                    <input className="search__input" type="text" placeholder="Поиск по блогу"/>
                </form>
            </div>

        </header>
    );
}

export default Header;