import './searchResults.scss';

const SearchResults = () => {

    return (
        <>
            <h1 className="page__title">Результаты поиска “Создание сайта”</h1>

            <article className="post">
                <div className="post__content">
                    <h2 className="post__title">
                        <a href="post.html">Как писать код быстро и безболезненно?</a>
                    </h2>
                    <p className="post__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.</p>
                </div>
                <div className="post__footer">
                    <ul className="post__data">
                        <li className="post__data-item">
                            <time datetime="2020-06-21">21.06.2020</time>
                        </li>
                        <li className="post__data-item">
                            <a href="post.html">создание сайтов</a>
                        </li>
                    </ul>

                    <a className="post__read" href="post.html">перейти</a>
                </div>
            </article>

            <article className="post">
                <div className="post__content">
                    <h2 className="post__title">
                        <a href="post.html">Как писать код быстро и безболезненно?</a>
                    </h2>
                    <p className="post__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.</p>
                </div>
                <div className="post__footer">
                    <ul className="post__data">
                        <li className="post__data-item">
                            <time datetime="2020-06-21">21.06.2020</time>
                        </li>
                        <li className="post__data-item">
                            <a href="post.html">создание сайтов</a>
                        </li>
                    </ul>

                    <a className="post__read" href="post.html">перейти</a>
                </div>
            </article>

            <article className="post">
                <div className="post__content">
                    <h2 className="post__title">
                        <a href="post.html">Как писать код быстро и безболезненно?</a>
                    </h2>
                    <p className="post__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.</p>
                </div>
                <div className="post__footer">
                    <ul className="post__data">
                        <li className="post__data-item">
                            <time datetime="2020-06-21">21.06.2020</time>
                        </li>
                        <li className="post__data-item">
                            <a href="post.html">создание сайтов</a>
                        </li>
                    </ul>

                    <a className="post__read" href="post.html">перейти</a>
                </div>
            </article>
        </>
    );
}

export default SearchResults;