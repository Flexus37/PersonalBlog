import { useState, useRef, useEffect } from 'react';
import { useGetContentQuery, useDeleteContentMutation, useDeleteContentFilesMutation } from '../../services/api/apiSlice';
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
        isLoading: isContentLoading,
        isError: isContentError
    } = useGetContentQuery({contentType: 'stories'});

    const [
        deleteContent,
        {
            isLoading: isContentDeleting,
            isError: isContentDeletingError
        }
     ] = useDeleteContentMutation();

     const [
        deleteContentFiles,
        {
            isLoading: isContentFilesDeleting,
            isError: isContentFilesDeletingError
        }
     ] = useDeleteContentFilesMutation();

    useEffect(() => {
        setStoriesWidth(storiesWrapper.current.offsetWidth);
    }, [])

    useEffect(() => {

        const slides = Math.ceil((stories.length + 1) / 4);

        setTotalStoriesSlides(prevSlides => {
            if (prevSlides !== slides) {
                storiesInner.current.style.width = `${slides}00%`;
            }
            return slides;
        });

    }, [stories])

    const onHandleDelete = (storiesId, contentArr) => {
        deleteContent({contentType: 'stories', id: storiesId});
        deleteContentFiles({contentType: 'stories', contentArr: contentArr});

        // setIsAnimationComplete(true);
    }

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

    const renderStories = (arr) => {
        const items = arr.map(item => {
            return (
                <motion.div
                    key={item.id}
                    className="stories__item"
                    data-modal="story-modal"
                    initial={{opacity: 0, scale: .7}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: .6}}
                    transition={{ease: "easeInOut", duration: .6}}
                    >
                    <div
                    className="stories__item-delete"
                    onClick={() => onHandleDelete(item.id, item.contentImages)}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                    <img className="stories__preview" src={item.contentImages[0].imageUrl} alt=""/>
                    <div className="stories__title">{item.article}</div>
                    <time className="stories__date" dateTime="2020-09-21 19:21">{item.time}</time>
                </motion.div>
            )
        })

        return items;
    }

    const elements = renderStories(stories);

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
                        <AnimatePresence>
                            {elements}
                        </AnimatePresence>
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