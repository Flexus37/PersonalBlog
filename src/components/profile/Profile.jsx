import './profile.scss';

const Profile = () => {

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
                    </div>
                    <div className="cabinet__avatar">
                        <img src="https://via.placeholder.com/150" alt="" />

                        <label className="cabinet__file">
                            <input type="file" />
                            выбрать аватар
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