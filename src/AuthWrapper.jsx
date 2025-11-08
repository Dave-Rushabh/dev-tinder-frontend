import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/common/Footer";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { REDUX_HANDLE_LOG_IN } from "./redux/slices/authSlice";
import { authData } from "./redux/selectors/auth";

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(authData);

  useEffect(() => {
    if (!isLoggedIn) {
      (async () => {
        try {
          const resp = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/profile/view`,
            { withCredentials: true }
          );

          if (resp.status === 200) {
            const { data } = resp;
            dispatch(REDUX_HANDLE_LOG_IN({ user: data }));
          }
        } catch (error) {
          console.error(error, "error finding the user");
        }
      })();
    }
  }, []);

  return (
    <>
      <Outlet />
      {children}
      <Footer />
    </>
  );
};

export default AuthWrapper;
