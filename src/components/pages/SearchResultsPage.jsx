import { Helmet } from "react-helmet";
import SearchResults from "../searchResults/SearchResults";

const SearchResultsPage = () => {

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="The page with search results"
                />
                <title>Search results</title>
            </Helmet>
            <SearchResults/>
        </>
    );
}

export default SearchResultsPage;