import './posts.scss';

const SinglePost = () => {

    return (
        <article className="post">
            <div className="post__actions">
                <a href="/index.html">вернуться назад</a>
                <a href="#">
                    поделиться<img className="post__actions-icon" src="/assets/images/post/share.svg" alt=""/>
                </a>
            </div>
            <div className="post__header post__header--open">
                <h1 className="post__title post__title--open">Как я сходил на FrontEnd Conf 2021</h1>
                <ul className="post__data">
                    <li className="post__data-item">
                        <time dateTime="2020-06-21">21.06.2020</time>
                    </li>
                    <li className="post__data-item">
                        <a href="#">конференции</a>
                    </li>
                </ul>
            </div>
            <div className="post__content">
                <div className="post__text">
                    <h2>Title h2</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.</p>

                    <h3>Title h3</h3>
                    <p>Lorem ipsum dolor sit amet, <a href="#">consectetur adipiscing elit</a>. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.</p>

                    <h4>Title h4</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.</p>

                    <p>
                        <img src="/assets/images/post/post-full.jpg" alt="" />
                    </p>

                    <ul>

                        <li>item</li>
                        <li>item</li>
                    </ul>

                    <ol>
                        <li>item</li>
                        <li>item</li>
                        <li>item</li>
                    </ol>

                    <table>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                            </tr>
                        </tbody>
                    </table>

                    <p>
                        <span className="fr-video">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/rwRKLqvzpAc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                        </span>
                    </p>
                </div>

                <div className="related">
                    <h3 className="post__subtitle">Интересно почитать</h3>
                    <ul className="related__list">

                        <li className="related__list-item">
                            <h4 className="related__list-title">
                                <a href="#">Как я сходил на FrontEnd Conf 2021</a>
                            </h4>
                            <time className="related__list-date" dateTime="2020-06-21">21.06.2020</time>
                        </li>

                        <li className="related__list-item">
                            <h4 className="related__list-title">
                                <a href="#">Как я сходил на FrontEnd Conf 2021 Как я сходил на FrontEnd Conf 2021</a>
                            </h4>
                            <time className="related__list-date" dateTime="2020-06-21">21.06.2020</time>
                        </li>

                        <li className="related__list-item">
                            <h4 className="related__list-title">
                                <a href="#">Как я сходил на FrontEnd Conf 2021</a>
                            </h4>
                            <time className="related__list-date" dateTime="2020-06-21">21.06.2020</time>
                        </li>

                        <li className="related__list-item">
                            <h4 className="related__list-title">
                                <a href="#">Как я сходил на FrontEnd Conf 2021</a>
                            </h4>
                            <time className="related__list-date" dateTime="2020-06-21">21.06.2020</time>
                        </li>

                    </ul>
                </div>


                <h3 className="post__subtitle">Обсуждение</h3>

                <form className="form" action="/" method="POST">
                    <div className="form__group">
                        <textarea className="form__control form__control--textarea" name="comments-text" placeholder="Текст комментария" data-autoresize></textarea>
                        <span className="form__line"></span>
                    </div>
                    <button className="btn btn--blue btn--rounded btn--small" type="submit">Отправить</button>
                </form>

                <ul className="comments">
                    <li className="comments__item">
                        <div className="comments__header">
                            <img className="comments__avatar" src="https://via.placeholder.com/30" alt="" />

                            <div className="comments__author">
                                <div className="comments__name">Алексей Дудин</div>
                                <time className="comments__pubdate" dateTime="2020-12-21">1 неделю назад</time>
                            </div>
                        </div>
                        <div className="comments__text">Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.</div>
                        <button className="comments__reply" type="button">ответить</button>

                        <ul className="comments">
                            <li className="comments__item">
                                <div className="comments__header">
                                    <img className="comments__avatar" src="https://via.placeholder.com/30" alt="" />

                                    <div className="comments__author">
                                        <div className="comments__name">Алексей Дудин</div>
                                        <time className="comments__pubdate" dateTime="2020-12-21">1 неделю назад</time>
                                    </div>
                                </div>
                                <div className="comments__text">Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.</div>
                                <button className="comments__reply" type="button">ответить</button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

        </article>
    );
}

export default SinglePost;