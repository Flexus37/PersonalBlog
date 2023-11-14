import { useState, useEffect, useRef } from 'react';
import { useGetContentQuery } from '../../services/api/apiSlice';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './modal.scss'


const StoryModal = ({closeModal, storyId}) => {

    const [storiesWidth, setStoriesWidth] = useState(0);
    const [storiesOffset, setStoriesOffset] = useState(0);
    const [storiesIndex, setStoriesIndex] = useState(0);
    const [totalStoriesSlides, setTotalStoriesSlides] = useState(1);

    const storiesWrapper = useRef(null);
    const storiesInner = useRef(null);

    const {
        data: story,
        isLoading,
        isError
    } = useGetContentQuery({contentType: 'stories', contentId: storyId})

    useEffect(() => {
        setStoriesWidth(storiesWrapper.current.offsetWidth);
    }, []);

    useEffect(() => {
        if (typeof story === 'undefined') {
            return;
        }

        const slides = Math.ceil(story.contentImages.length);

        setTotalStoriesSlides(prevSlides => {
            if (prevSlides !== slides) {
                storiesInner.current.style.width = `${slides}00%`;
            }
            return slides;
        });

    }, [story]);

    const onHandleCloseModal = (element) => {
        if (element.className === 'modal') {
            closeModal();
            document.body.style.overflow = 'auto';
        }
    }

    const onHandleClickNext = () => {
        if (storiesIndex < totalStoriesSlides - 1) {
            storiesInner.current.style.transform = `translateX(${storiesOffset - storiesWidth}px)`;
            setStoriesIndex(index => index + 1);
            setStoriesOffset(offset => offset - storiesWidth);
        }

    }

    const onHandleClickPrev = () => {
        if (storiesIndex > 0) {
            storiesInner.current.style.transform = `translateX(${storiesOffset + storiesWidth}px)`;
            setStoriesIndex(index => index - 1);
            setStoriesOffset(offset => offset + storiesWidth);
        }
    }

    const renderStoryContent = () => {
        if (isLoading) {
            return <Spinner />
        }

        if (isError) {
            return <ErrorMessage />
        }

        if (story.contentImages.length === 0) {
            return null;
        }

        const items = story.contentImages.map(item => {
            return (
            <div key={item.imageId} className="modal__content-item">
                <img className='modal__content-file' src={item.imageUrl} alt={story.article} />
            </div>
            )
        });

        return (
            <div ref={storiesInner} className="modal__inner">
                {items}
            </div>
        )
    }

    return (
        <div className="modal" id="story-modal" onClick={(e) => onHandleCloseModal(e.target)}>
            <div className="modal__content modal__content--story">
                <button
                    type='button'
                    className='modal__prev-slide'
                    onClick={onHandleClickPrev}
                >
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
                <div ref={storiesWrapper} className="modal__wrapper">
                    {renderStoryContent()}
                </div>
                <button
                    type='button'
                    className='modal__next-slide'
                    onClick={onHandleClickNext}
                >
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </div>
        /* <video className="modal__video" src="" poster="https://via.placeholder.com/420x580"></video> */
    );

}

export default StoryModal;