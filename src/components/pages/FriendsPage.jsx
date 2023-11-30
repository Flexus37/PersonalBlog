import { Helmet } from "react-helmet";
import Friends from "../friends/Friends";

const FriendsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="The page with user's friends"
                />
                <title>Друзья</title>
            </Helmet>
            <Friends />
        </>
    )
}

export default FriendsPage;