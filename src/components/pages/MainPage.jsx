import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPageId } from '../../services/api/userInfoSlice';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useEffect } from 'react';

import Stories from "../stories/Stories";
import AddContent from "../addContent/AddContent";
import Posts from "../posts/Posts";
import EmptyMessage from '../emptyMessage/EmptyMessage';

// import Pagination from "../pagination/Pagination";

const MainPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    const {userId, isPostsEmpty, isStoriesEmpty} = useSelector(state => state.userInfo);

    useEffect(() => {
        dispatch(setCurrentPageId(id));
    }, [id]);

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="The page with user's personal blog"
                />
                <title>Personal blog</title>
            </Helmet>
            {
                userId !== id && isPostsEmpty && isStoriesEmpty ?
                <EmptyMessage /> :
                <>
                    <Stories pageId={id} />
                    <h2 className='page__title'>Посты</h2>
                    <AddContent key='addPost' type='posts'/>
                    <Posts pageId={id} />
                </>
            }
        </>
    )
}

export default MainPage;