import { useState, useRef, useEffect } from 'react';
import { useGetContentQuery, useCreateContentMutation } from '../../services/api/apiSlice';
import { AnimatePresence, motion } from 'framer-motion';

import AddStory from './add-story/AddStory';
import AddContent from '../addContent/AddContent';
import './stories.scss';

const Stories = () => {
    const [isAddContent, setIsAddContent] = useState(false);

    const [storiesWidth, setStoriesWidth] = useState(0);
    const [storiesOffset, setStoriesOffset] = useState(0);
    const [storiesIndex, setStoriesIndex] = useState(0);
    const [totalStoriesSlides, setTotalStoriesSlides] = useState(1);

    const storiesWrapper = useRef(null);
    const storiesInner = useRef(null);

    const {
        data: stories = [],
        isLoading: isDataLoading,
        isError: isDataError
    } = useGetContentQuery({contentType: 'stories'});

    useEffect(() => {
        setStoriesWidth(storiesWrapper.current.offsetWidth);
    }, [])

    useEffect(() => {
        setTotalStoriesSlides(Math.ceil((stories.length + 1) / 4))
    }, [stories])

    const onHandleClickNext = () => {
        if (storiesIndex < totalStoriesSlides - 1) {
            storiesInner.current.style.transform = `translateX(-${storiesOffset + storiesWidth + 20}px)`;
            setStoriesIndex(index => index + 1);
            setStoriesOffset(offset => offset + storiesWidth);
        }

    }

    const onHandleClickPrev = () => {
        if (storiesIndex > 0) {
            storiesInner.current.style.transform = `translateX(${storiesOffset - storiesWidth}px)`;
            setStoriesIndex(index => index - 1);
            setStoriesOffset(offset => offset - storiesWidth);
        }
    }

    return (
        <>
            <div className="stories">
                <button
                    type='button'
                    className='stories__prev-slide'
                    onClick={onHandleClickPrev}>
                        <i className="fa-solid fa-chevron-right"></i>
                </button>

                <button
                    type='button'
                    className='stories__next-slide'
                    onClick={onHandleClickNext}>
                        <i className="fa-solid fa-chevron-right"></i>
                </button>


                <div ref={storiesWrapper} className="stories__wrapper">
                    <div ref={storiesInner} className="stories__inner">
                        <AddStory renderAddContent={() => setIsAddContent(true)} />

                        <div className="stories__item" data-modal="story-modal">
                            <img className="stories__preview" src="/assets/images/stories/stories-2.jpg" alt=""/>
                            <div className="stories__title">Заканчиваю сложный проект</div>
                            <time className="stories__date" dateTime="2020-09-21 19:21">21.09.2020</time>
                        </div>

                        <div className="stories__item" data-modal="story-modal">
                            <img className="stories__preview"src="/assets/images/stories/stories-3.jpg" alt=""/>
                            <div className="stories__title">Переехал в новую квартиру</div>
                            <time className="stories__date" dateTime="2020-09-21 19:21">21.09.2020</time>
                        </div>

                        <div className="stories__item" data-modal="story-modal">
                            <img className="stories__preview" src="/assets/images/stories/stories-4.jpg" alt=""/>
                            <div className="stories__title">Осень пришла</div>
                            <time className="stories__date" dateTime="2020-08-28 19:21">28.08.2020</time>
                        </div>

                        <div className="stories__item" data-modal="story-modal">
                            <img className="stories__preview" src="/assets/images/stories/stories-4.jpg" alt=""/>
                            <div className="stories__title">Осень пришла</div>
                            <time className="stories__date" dateTime="2020-08-28 19:21">28.08.2020</time>
                        </div>

                        <div className="stories__item" data-modal="story-modal">
                            <img className="stories__preview" src="/assets/images/stories/stories-4.jpg" alt=""/>
                            <div className="stories__title">Осень пришла</div>
                            <time className="stories__date" dateTime="2020-08-28 19:21">28.08.2020</time>
                        </div>

                        <div className="stories__item" data-modal="story-modal">
                            <img className="stories__preview" src="/assets/images/stories/stories-4.jpg" alt=""/>
                            <div className="stories__title">Осень пришла</div>
                            <time className="stories__date" dateTime="2020-08-28 19:21">28.08.2020</time>
                        </div>
                    </div>
                </div>


            </div>

            {isAddContent ?
            <AnimatePresence>
                <AddContent key='addStory' type='stories' />
            </AnimatePresence>
             : null}
        </>

    );
}

export default Stories;