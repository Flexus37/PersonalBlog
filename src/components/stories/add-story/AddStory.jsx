import {useSelector} from 'react-redux'
import './addStory.scss'

const AddStory = ({renderAddContent}) => {

    const {userId, currentPageId} = useSelector(state => state.userInfo);

    if (userId !== currentPageId) {
        return;
    }

    return (
        <div className="add-story" data-modal="story-modal" onClick={renderAddContent}>
            <div className='add-story__inner'>
                <div className='add-story__btn'>
                    <i className="fa-solid fa-plus"></i>
                </div>
                <h2 className='add-story__title'>Добавить историю</h2>
            </div>
        </div>
    )
}

export default AddStory;