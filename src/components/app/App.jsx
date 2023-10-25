import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { MainPage, ProfilePage, WorksPage, SearchResultsPage } from "../pages";

import SinglePost from "../posts/SinglePost";

import './app.scss';

import { useEffect } from "react";

function App() {

  // useEffect(() => {
  //   console.log(getPosts());
  // }, []);

  return (
    <Router>
      <div className="page" id="page">
        <Header/>

        <main className="main">
            <div className="container">
                {/* <Suspense fallback> */}
                  <Sidebar/>
                  <Routes>
                    <Route path="/" element={<MainPage/>} />
                    <Route path="/profile" element={<ProfilePage/>} />
                    <Route path="/works" element={<WorksPage/>} />
                    <Route path="/single-post/:id" element={<SinglePost/>} />
                    <Route path='/search-results' element={<SearchResultsPage/>} />
                  </Routes>
                {/* </Suspense> */}
            </div>
        </main>
      </div>
    </Router>

  );
}

export default App;
