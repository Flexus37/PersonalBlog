import { onAuthStateChanged } from "firebase/auth"
import { Suspense, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { setUserAuthentication, setUserId } from "../../services/api/userInfoSlice"
import { auth } from "../../services/firebase/FirestoreConfig"

import { SignIn, SignUp } from "../auth"
import Header from "../header/Header"
import { FriendRequestsPage, FriendsPage, MainPage, ProfilePage, SearchResultsPage, WorksPage } from "../pages"
import Sidebar from "../sidebar/Sidebar"
// import { selectAll } from "../../services/api/userInfoSlice";

// import SinglePost from "../posts/SinglePost";
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import ErrorMessage from "../errorMessage/ErrorMessage"
import Spinner from '../spinner/Spinner'

import './app.scss'



function App() {
  const {isAuthenticated, userId} = useSelector(state => state.userInfo);
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
                    <ErrorBoundary>
                      <Suspense fallback={<Spinner />}>
                        <Sidebar />
                        <Routes>
                          <Route path="/" element={<Navigate replace to={`/blog/${userId}`} />} />
                          <Route path="/sign-in" element={<Navigate replace to={`/blog/${userId}`} />} />
                          <Route path="/blog/:id" element={<MainPage/>} />
                          <Route path="/profile" element={<ProfilePage/>} />
                          <Route path="/works/:id" element={<WorksPage/>} />
                          <Route path="/friends" element={<FriendsPage />} />
                          <Route path="/friends/requests" element={<FriendRequestsPage />} />
                          {/* <Route path="/single-post/:id" element={<SinglePost/>} /> */}
                          <Route path='/search-results' element={<SearchResultsPage/>} />
                        </Routes>

                      </Suspense>
                    </ErrorBoundary>
                </div>
            </main>
          </div>
        ) : (
          <ErrorBoundary>
            <Suspense fallback={<ErrorMessage />}>
              <Routes>
                <Route path="/*" element={<Navigate replace to='/sign-in' />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path='/registration' element={<SignUp />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        )
      }
    </Router>
  );


}

export default App;
