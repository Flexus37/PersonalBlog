import { Helmet } from "react-helmet";

import Stories from "../stories/Stories";
import AddContent from "../addContent/AddContent";
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
            <AddContent type='posts'/>
            <Posts/>
            {/* <Pagination/> */}
        </>
    )
}

export default MainPage;