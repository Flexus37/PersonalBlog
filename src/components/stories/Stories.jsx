import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useGetAllContentQuery, useDeleteContentMutation, useDeleteContentFilesMutation } from '../../services/api/apiSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { setStoriesEmpty } from '../../services/api/userInfoSlice';

import AddStory from './add-story/AddStory';
import AddContent from '../addContent/AddContent';
import StoryModal from '../modals/StoryModal';

import './stories.scss';
import OverlaySpinner from '../spinner/OverlaySpinner';

const Stories = ({pageId}) => {
    const [isAddContent, setIsAddContent] = useState(false);

    const [storiesWidth, setStoriesWidth] = useState(0);
    const [storiesOffset, setStoriesOffset] = useState(0);
    const [storiesIndex, setStoriesIndex] = useState(0);
    const [totalStoriesSlides, setTotalStoriesSlides] = useState(1);
    const [isUserOwnPage, setIsUserOwnPage] = useState(false);
    const [deletingStoryIds, setDeletingStoryIds] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [modalStoryId, setModalStoryId] = useState(null);

    const storiesWrapper = useRef(null);
    const storiesInner = useRef(null);

    const {userId, isStoriesEmpty} = useSelector(state => state.userInfo);
    const dispatch = useDispatch();

    const {
        data: stories = [],
        isLoading: isStoryLoading,
        isError: isStoryError
    } = useGetAllContentQuery({userId: pageId, contentType: 'stories'});

    const [
        deleteContent,
        {
            isLoading: isStoryDeleting,
            isError: isStoryDeletingError
        }
     ] = useDeleteContentMutation();

     const [
        deleteContentFiles,
        {
            isLoading: isStoryFilesDeleting,
            isError: isStoryFilesDeletingError
        }
     ] = useDeleteContentFilesMutation();

    useEffect(() => {
        if (pageId === userId) {
            setIsUserOwnPage(true);
        }
        setStoriesWidth(storiesWrapper.current.offsetWidth);
    }, [])

    useEffect(() => {

        if (stories.length === 0) {
            dispatch(setStoriesEmpty(true));
        } else if (isStoriesEmpty) {
            dispatch(setStoriesEmpty(false));
        }

        const slides = Math.ceil((stories.length + 1) / 4);

        setTotalStoriesSlides(prevSlides => {
            if (prevSlides !== slides) {
                storiesInner.current.style.width = `${slides}00%`;
            }
            return slides;
        });

    }, [stories])

    const onHandleDelete = async (storyId, contentIdArr) => {
        if (isUserOwnPage) {
            setDeletingStoryIds(prevArr => prevArr.includes(storyId) ? prevArr : [...prevArr, storyId])
            await deleteContent({userId, contentType: 'stories', id: storyId});
            await deleteContentFiles({userId, contentType: 'stories', contentIdArr});
            setDeletingStoryIds(prevArr => prevArr.filter(id => storyId !== id))
        }
    }

    const onHandleClickNext = () => {
        if (storiesIndex < totalStoriesSlides - 1) {
            storiesInner.current.style.transform = `translateX(${storiesOffset - storiesWidth - 20}px)`;
            setStoriesIndex(index => index + 1);
            setStoriesOffset(offset => offset - storiesWidth - 20);
        }

    }

    const onHandleClickPrev = () => {
        if (storiesIndex > 0) {
            storiesInner.current.style.transform = `translateX(${storiesOffset + storiesWidth + 20}px)`;
            setStoriesIndex(index => index - 1);
            setStoriesOffset(offset => offset + storiesWidth + 20);
        }
    }

    const onHandleShowModal = (e, id) => {
        if (e.target.className !== 'fa-solid fa-xmark') {
            setShowModal(true);
            setModalStoryId(id);
            document.body.style.overflow = 'hidden';
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
                onClick={(e) => onHandleShowModal(e, item.id)}
                >
                    {
                        isStoryDeleting && deletingStoryIds.includes(item.id)
                        ? <OverlaySpinner />
                        : null
                    }
                    {
                        isUserOwnPage ?
                        <div
                        className="stories__item-delete"
                        onClick={() => onHandleDelete(item.id, item.contentImages)}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </div> :
                        null
                    }
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

                <h2 className='page__title'>Истории</h2>

                <AnimatePresence>
                    {/* Не работает, починить! */}
                    {storiesIndex < totalStoriesSlides - 1 ? (
                        <motion.button
                            type='button'
                            key='stories__next-slide'
                            className='stories__next-slide'
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{ease: "easeInOut", duration: .3}}
                            onClick={onHandleClickNext}>
                                <i className="fa-solid fa-chevron-right"></i>
                        </motion.button>
                    ): null}

                    {storiesIndex !== 0 ? (
                        <motion.button
                            type='button'
                            key='stories__prev-slide'
                            className='stories__prev-slide'
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{ease: "easeInOut", duration: .3}}
                            onClick={onHandleClickPrev}>
                                <i className="fa-solid fa-chevron-right"></i>
                        </motion.button>
                    ): null}
                </AnimatePresence>

                <div ref={storiesWrapper} className="stories__wrapper">
                    <div ref={storiesInner} className="stories__inner">
                        <AddStory renderAddContent={() => setIsAddContent(isAddContent => !isAddContent)} />
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

            {
                showModal ? createPortal(<StoryModal pageId={pageId} storyId={modalStoryId} closeModal={() => setShowModal(false)} />, document.body) : null
            }
        </>

    );
}

export default Stories;