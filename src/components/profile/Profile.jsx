import { useState, useRef, useEffect } from 'react';
import { autoresizeTextarea } from '../../services/autoResizeTextarea';

import './profile.scss';

import profileAvatar from '../../resources/img/profile-avatar.jpg';
import sidebarHeader from '../../resources/img/sidebar-header.jpg';

const Profile = () => {
    const [profession, setProfession] = useState('');
    const [about, setAbout] = useState('');

    const textareaRefs = useRef([]);

    useEffect(() => {
        autoresizeTextarea(textareaRefs, '27px');
    }, [])

    autoresizeTextarea(textareaRefs, '27px');

    return (
        <>
            <h1 className="page__title">Профиль</h1>

            <form className="form" action="/" method="post">
                <div className="cabinet">
                    <div className="cabinet__form">
                        <div className="form__group form__group--medium">
                            <input type="text" className="form__control" placeholder="Ваше имя" value="Алексей Дудин" />
                            <span className="form__line"></span>
                        </div>

                        <div className="form__group form__group--medium">
                            <input type="email" className="form__control" placeholder="Ваш e-mail" value="aleshadudin53@gmail.com" />
                            <span className="form__line"></span>
                        </div>

                        <div className="form__group form__group--medium">
                            <input type="password" className="form__control" placeholder="Новый пароль" />
                            <span className="form__line"></span>
                        </div>

                        <div className="form__group form__group--medium">
                            <input type="password" className="form__control" placeholder="Подтвердите пароль" />
                            <span className="form__line"></span>
                        </div>

                        <div className="form__group form__group--medium">
                            <textarea
                                ref={el => (textareaRefs.current[0] = el)}
                                className='form__control form__control--textarea'
                                name="profession"
                                placeholder='Чей блог? Например: "блог frontend-разработчика"'
                                value={profession}
                                onChange={(e) => setProfession(e.target.value)}
                            ></textarea>
                            <span className="form__line"></span>
                        </div>

                        <div className="form__group form__group--medium">
                            <textarea
                                ref={el => (textareaRefs.current[1] = el)}
                                className='form__control form__control--textarea'
                                name="profession"
                                placeholder='О себе'
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                            ></textarea>
                            <span className="form__line"></span>
                        </div>
                    </div>
                    <div className="cabinet__content">
                        <img className='cabinet__content-header' src={sidebarHeader} alt="" />
                        <img className='cabinet__content-avatar' src={profileAvatar} alt="" />

                        <label className="cabinet__file">
                            <input type="file" />
                            выбрать аватар
                            <br />
                        </label>
                        <label className="cabinet__file">
                            <input type="file" />
                            выбрать шапку профиля
                        </label>
                    </div>
                </div>

                <div className="form__footer">
                    <button className="btn btn--blue btn--rounded btn--small" type="submit">Сохранить</button>
                </div>
            </form>
        </>
    );
}

export default Profile;