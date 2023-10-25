import ''

const SignIn = () => {

    return (
        <>
            <h1 className="page__title page__title--center">Вход</h1>

            <form className="form form--auth" action="/" method="POST">

                <div className="form__group form__group--medium">
                    <input type="email" className="form__control" placeholder="E-mail" value="aleshadudin53@gmail.com" />
                    <span className="form__line"></span>
                </div>

                <div className="form__group form__group--medium">
                    <input type="password" className="form__control" placeholder="Пароль" />
                    <span className="form__line"></span>
                </div>

                <div className="form__footer form__footer--center">
                    <div className="form__group form__group--medium">
                        <button className="btn btn--blue btn--rounded btn--small" type="submit">Войти</button>
                    </div>

                    <ul className="form__footer-list">
                        <li>
                            <a href="/signup.html">регистрация</a>
                        </li>
                        <li>
                            <a href="/reset.html">восстановить</a>
                        </li>
                    </ul>
                </div>
            </form>
        </>
    );
}

export default SignIn;