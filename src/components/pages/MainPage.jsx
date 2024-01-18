import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";

import Stories from "../stories/Stories";
import AddContent from "../addContent/AddContent";
import Posts from "../posts/Posts";
// import Pagination from "../pagination/Pagination";

const MainPage = () => {
    const {id} = useParams();

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