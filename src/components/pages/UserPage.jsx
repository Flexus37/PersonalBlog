import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";

import Stories from "../stories/Stories";
import Posts from "../posts/Posts";

const UserPage = () => {
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
            <Posts userId={id} />
        </>
    )
}

export default UserPage;