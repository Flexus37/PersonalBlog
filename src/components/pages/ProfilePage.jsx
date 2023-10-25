import { Helmet } from "react-helmet";
import Profile from "../profile/Profile";

const ProfilePage = () => {

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="The page with the user's personal profile"
                />
                <title>Profile</title>
            </Helmet>
            <Profile/>
        </>

    );
}

export default ProfilePage;