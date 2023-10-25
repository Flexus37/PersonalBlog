import './modal.scss';

const ContactModal = () => {

    return (
        <div className="modal" id="contact-modal">
            <div className="modal__content modal__content--contact">
                <form className="form" action="/" method="POST">

                    <button className="modal__close" type="button">
                        <img src="/assets/images/close.svg" alt="Закрыть" />
                    </button>

                    <div className="form__group form__group--medium">
                        <input type="text" className="form__control" placeholder="Ваше имя" value="" />
                        <span className="form__line"></span>
                    </div>

                    <div className="form__group form__group--medium">
                        <input type="email" className="form__control" placeholder="E-mail" value="" />
                        <span className="form__line"></span>
                    </div>

                    <div className="form__group form__group--medium">
                        <textarea className="form__control form__control--textarea" placeholder="Текст сообщения"></textarea>
                        <span className="form__line"></span>
                    </div>

                    <div className="form__footer">
                        <div className="form__group form__group--medium">
                            <button className="btn btn--blue btn--rounded btn--small" type="submit">Отправить</button>
                        </div>
                    </div>
                </form>

                <ul className="modal__footer">
                    <li className="modal__footer-item">
                        e-mail: <a href="mailto:info@mywebsite.ru">info@mywebsite.ru</a>
                    </li>
                    <li className="modal__footer-item">
                        тел: <a href="tel:+94323285622">+943-232-856-22</a>
                    </li>
                </ul>

            </div>
        </div>
    );
}

export default ContactModal;