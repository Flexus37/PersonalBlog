import { useGetContentQuery } from '../../services/api/apiSlice';

import './modal.scss'

const StoryModal = ({closeModal, storyId}) => {

    const {
        data: story,
        isLoading,
        isError
    } = useGetContentQuery({contentType: 'stories', contentId: storyId})

    const onHandleCloseModal = (element) => {
        if (element.className === 'modal') {
            closeModal();
        }
    }

    return (
        <div className="modal" id="story-modal" onClick={(e) => onHandleCloseModal(e.target)}>
            <div className="modal__content modal__content--story">
                <video className="modal__video" src="" poster="https://via.placeholder.com/420x580"></video>
            </div>
        </div>
    );

}

export default StoryModal;