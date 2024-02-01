import { Helmet } from "react-helmet";
import FriendRequestList from "../friends/FriendRequestList";

const FriendRequestsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="The page with user's friend requests"
                />
                <title>Заявки в друзья</title>
            </Helmet>
            <FriendRequestList />
        </>
    )
}

export default FriendRequestsPage;