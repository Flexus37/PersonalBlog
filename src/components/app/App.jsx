import { useEffect } from "react";
import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector} from 'react-redux'

import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { MainPage, ProfilePage, WorksPage, SearchResultsPage } from "../pages";
import { LogIn, SignUp } from "../auth";
// import { selectAll } from "../../services/api/userInfoSlice";

import SinglePost from "../posts/SinglePost";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './app.scss';



function App() {
  const {isAuthenticated} = useSelector(state => state.userInfo);

  if (!isAuthenticated) {
    return (
      <Router>
        <Suspense fallback={<ErrorMessage />}>
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path='/registration' element={<SignUp />} />
          </Routes>
        </Suspense>
      </Router>
    )
  }

  return (
    <Router>
      <div className="page" id="page">
        <Header/>

        <main className="main">
            <div className="container">
                <Suspense fallback={<ErrorMessage />}>
                  <Sidebar/>
                  <Routes>
                    <Route path="/" element={<MainPage/>} />
                    <Route path="/profile" element={<ProfilePage/>} />
                    <Route path="/works" element={<WorksPage/>} />
                    <Route path="/single-post/:id" element={<SinglePost/>} />
                    <Route path='/search-results' element={<SearchResultsPage/>} />
                  </Routes>

                </Suspense>
            </div>
        </main>
      </div>
    </Router>

  );
}

export default App;
