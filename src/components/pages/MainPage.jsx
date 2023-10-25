import { Helmet } from "react-helmet";

import Stories from "../stories/Stories";
import AddPost from "../addPost/AddPost";
import Posts from "../posts/Posts";
// import Pagination from "../pagination/Pagination";

const MainPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="The page with user's personal blog"
                />
                <title>Personal blog</title>
            </Helmet>
            <Stories/>
            <AddPost/>
            <Posts/>
            {/* <Pagination/> */}
        </>
    )
}

export default MainPage;