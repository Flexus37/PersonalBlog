import { useEffect } from "react";
import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase/FirestoreConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux'
import { setUserAuthentication, setUserId } from "../../services/api/userInfoSlice";

import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { MainPage, ProfilePage, WorksPage, SearchResultsPage, FriendsPage } from "../pages";
import { SignIn, SignUp } from "../auth";
// import { selectAll } from "../../services/api/userInfoSlice";

import SinglePost from "../posts/SinglePost";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './app.scss';



function App() {
  const {isAuthenticated} = useSelector(state => state.userInfo);
  const dispatch = useDispatch();


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUserAuthentication(true));
        dispatch(setUserId(user.uid));
      } else {
        dispatch(setUserAuthentication(false));
      }
    });
  }, [])

  return (
    <Router>
      {
        isAuthenticated ? (
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
                        <Route path="/friends" element={<FriendsPage />} />
                        {/* <Route path="/single-post/:id" element={<SinglePost/>} /> */}
                        <Route path='/search-results' element={<SearchResultsPage/>} />
                      </Routes>

                    </Suspense>
                </div>
            </main>
          </div>
        ) : (
          <Suspense fallback={<ErrorMessage />}>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path='/registration' element={<SignUp />} />
            </Routes>
          </Suspense>
        )
      }
    </Router>
  );


}

export default App;
