import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { setCurrentPageId } from '../../services/api/userInfoSlice';
import { Helmet } from "react-helmet";
import Works from "../works/Works";
import { useEffect } from 'react';

const WorksPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(setCurrentPageId(id));
        }
    }, [id]);

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="The page with user's works"
                />
                <title>Personal blog</title>
            </Helmet>
            <Works />
        </>
    );
}

export default WorksPage;