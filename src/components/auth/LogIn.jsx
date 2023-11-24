

import './auth.scss';
import GoogleIcon from '../../resources/img/icons/Google.svg'

const LogIn = () => {

    return (
        <div className="auth">
            <div className="auth__content">
                <h1 className="auth__title">Вход</h1>
                <form action="" className="auth__form">
                    <div className="auth__form form__group form__group--medium">
                        <input
                            type="text"
                            className="form__control"
                            placeholder='Логин или email'
                        />
                        <span className="form__line"></span>
                    </div>
                    <div className="auth__form form__group form__group--medium">
                        <input
                            type="password"
                            className="form__control"
                            placeholder='Пароль'
                        />
                        <span className="form__line"></span>
                    </div>
                    <button className="auth__submit btn btn--small btn--rounded btn--blue">Войти</button>
                    <button className="auth__submit btn btn--small btn--rounded btn--black">
                        <img src={GoogleIcon} alt="" />
                        <p>Войти c помощью Google</p>
                    </button>
                </form>
                <div className="auth__extra">
                    <div className="auth__extra-item">
                        <a href="#">восстановить</a>
                    </div>
                    <div className="auth__extra-item">
                        <a href="#">регистрация</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn;