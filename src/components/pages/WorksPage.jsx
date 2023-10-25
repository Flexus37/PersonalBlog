import { Helmet } from "react-helmet";
import Works from "../works/Works";

const WorksPage = () => {

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="The page with user's works"
                />
                <title>Personal blog</title>
            </Helmet>
            <Works/>
        </>
    );
}

export default WorksPage;