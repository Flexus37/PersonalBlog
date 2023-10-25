import './modal.scss';

const ShareModal = () => {

    return (
        <div className="modal">
            <div className="modal__content">

                <button className="modal__close" type="button">
                    <img src="/assets/images/close.svg" alt="Закрыть" />
                </button>

                <ul className="social">
                    <li className="social__item">
                        <a className="social__link" href="#">
                            <img src="/assets/images/share/facebook.svg" alt="" />
                        </a>
                    </li>
                    <li className="social__item">
                        <a className="social__link" href="#">
                            <img src="/assets/images/share/twitter.svg" alt="" />
                        </a>
                    </li>
                    <li className="social__item">
                        <a className="social__link" href="#">
                            <img src="/assets/images/share/vk.svg" alt="" />
                        </a>
                    </li>
                    <li className="social__item">
                        <a className="social__link" href="#">
                            <img src="/assets/images/share/copy.svg" alt="" />
                        </a>
                    </li>
                </ul>

            </div>
        </div>
    );
}

export default ShareModal;