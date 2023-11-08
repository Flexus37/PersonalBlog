import { useState } from 'react';
import { useGetContentQuery } from '../../services/api/apiSlice';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './modal.scss'


const StoryModal = ({closeModal, storyId}) => {
    const [storyContentIndex, setStoryContentIndex] = useState(0)

    const {
        data: story,
        isLoading,
        isError
    } = useGetContentQuery({contentType: 'stories', contentId: storyId})

    const onHandleCloseModal = (element) => {
        if (element.className === 'modal') {
            closeModal();
            document.body.style.overflow = 'auto';
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
            <div className="modal__inner">
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
                    // onClick={onHandleClickPrev}
                >
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
                <div className="modal__wrapper">
                    {renderStoryContent()}
                </div>
                <button
                    type='button'
                    className='modal__next-slide'
                    // onClick={onHandleClickNext}
                >
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </div>
        /* <video className="modal__video" src="" poster="https://via.placeholder.com/420x580"></video> */
    );

}

export default StoryModal;