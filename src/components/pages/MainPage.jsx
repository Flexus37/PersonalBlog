import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPageId } from '../../services/api/userInfoSlice';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";

import Stories from "../stories/Stories";
import AddContent from "../addContent/AddContent";
import Posts from "../posts/Posts";
import { useEffect } from 'react';
// import Pagination from "../pagination/Pagination";

const MainPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

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
            <Stories userId={id} />
            <AddContent key='addPost' type='posts'/>
            <Posts userId={id} />
            {/* <Pagination/> */}
        </>
    )
}

export default MainPage;