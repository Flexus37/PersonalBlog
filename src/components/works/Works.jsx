import './work.scss';

const Works = () => {

    return (
        <>
           <h1 className="page__title">Мои работы</h1>

            <article className="work">
                <div className="work__preview">
                    <picture>
                        <source srcSet="https://place-hold.it/575x150" media="(max-width: 575px)" />
                        <img src="/assets/images/works/work-1.jpg" alt="" />
                    </picture>
                </div>
                <div className="work__content">
                    <h2 className="work__title">
                        <a href="#" target="_blank">altermono.com</a>
                    </h2>
                    <div className="work__description">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis nemo ipsam voluptatibus consequatur mollitia, voluptate temporibus perferendis a! Velit, omnis! Dolorum autem, magni quidem numquam modi neque. Cupiditate, quis hic?</p>
                    </div>
                    <ul className="tags">
                        <li className="tags__item">дизайн</li>
                        <li className="tags__item">создание сайтов</li>
                        <li className="tags__item">SMM</li>
                    </ul>
                    <div className="work__footer">
                        <a className="btn btn--blue btn--rounded btn--small" href="#" target="_blank">Перейти на сайт</a>
                    </div>
                </div>
            </article>

            <article className="work">
                <div className="work__preview">
                    <picture>
                        <source srcSet="https://place-hold.it/575x150/333" media="(max-width: 575px)" />
                        <img src="/assets/images/works/work-2.jpg" alt="" />
                    </picture>
                </div>
                <div className="work__content">
                    <h2 className="work__title">
                        <a href="#" target="_blank">codedoco.com</a>
                    </h2>
                    <div className="work__description">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis nemo ipsam voluptatibus consequatur mollitia</p>
                    </div>
                    <ul className="tags">
                        <li className="tags__item">дизайн</li>
                        <li className="tags__item">создание сайтов</li>
                        <li className="tags__item">SMM</li>
                        <li className="tags__item">дизайн</li>
                        <li className="tags__item">создание сайтов</li>
                        <li className="tags__item">SMM</li>
                    </ul>
                    <div className="work__footer">
                        <a className="btn btn--blue btn--rounded btn--small" href="#" target="_blank">Перейти на сайт</a>
                    </div>
                </div>
            </article>
        </>
    );
}

export default Works;