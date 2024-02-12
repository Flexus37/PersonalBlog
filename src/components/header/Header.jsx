import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserAuthentication, setSidebarOpening } from '../../services/api/userInfoSlice';
import { auth } from '../../services/firebase/FirestoreConfig';
import { signOut } from 'firebase/auth';


import './header.scss';

const Header = () => {
    const {userId, isSidebarOpened} = useSelector(state => state.userInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onHandleSignOut = () => {
        signOut(auth)
            .then(() => {
                dispatch(setUserAuthentication(false));
                navigate('/');
            })
            .catch(() => {
                console.log('Error sign out!');
            })
    }

    const onHandleSidebarOpen = () => {
        dispatch(setSidebarOpening(!isSidebarOpened));
    }

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
                                to={`/blog/${userId}`}
                            >Главная</NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink
                                className={({isActive}) => isActive ?
                                'nav__link active' : 'nav__link'
                                }
                                to='/friends'
                                href='#'
                            >Друзья</NavLink>

                            <ul className="subnav">
                                <li>
                                    <NavLink className='subnav__link' to='/friends'>Все друзья</NavLink>
                                </li>
                                <li>
                                    <NavLink className='subnav__link' to='/friends/requests'>Заявки в друзья</NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>

                <button onClick={onHandleSidebarOpen} className={isSidebarOpened ? 'burger show-sidebar' : 'burger'} type="button" id="sidebarToggle">
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
                            <a onClick={onHandleSignOut} className="nav__link" href="#">Выйти</a>
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