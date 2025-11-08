import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { authData } from "./redux/selectors/auth";

import AuthWrapper from "./AuthWrapper";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Body from "./components/BodyWrapper";
import LandingPage from "./components/home/LandingPage";
import Feed from "./components/Feed/Feed";
import ViewOrEditProfile from "./components/profile/ViewOrEditProfile";
import Matches from "./components/matches";
import ConnectionRequests from "./components/requests";

function App() {
  const { isLoggedIn } = useSelector(authData);

  return (
    <BrowserRouter>
      <Routes>
        {/* 🏠 Public Routes */}
        {!isLoggedIn ? (
          <>
            <Route
              path="/"
              element={
                <AuthWrapper>
                  <LandingPage />
                </AuthWrapper>
              }
            />

            <Route path="/auth" element={<AuthWrapper />}>
              <Route index element={<Navigate to="/auth/login" replace />} />
              <Route path="login" element={<Login />} />
              <Route path="sign-up" element={<SignUp />} />
            </Route>

            {/* 🔒 Prevent unauthenticated access to protected routes */}
            <Route path="/*" element={<Navigate to="/auth/login" replace />} />
          </>
        ) : (
          <>
            {/* 🔐 Protected Routes */}
            <Route path="/" element={<Body />}>
              <Route index element={<Navigate to="/feed" replace />} />
              <Route path="profile" element={<ViewOrEditProfile />} />
              <Route path="feed" element={<Feed />} />
              <Route path="matches" element={<Matches />} />
              <Route path="requests" element={<ConnectionRequests />} />
            </Route>

            {/* 🚫 Redirect logged-in users away from public routes */}
            <Route path="/auth/*" element={<Navigate to="/feed" replace />} />

            {/* 🌐 Catch-all unknown routes */}
            <Route path="*" element={<Navigate to="/feed" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
