import { useDispatch, useSelector } from "react-redux";
import { authData } from "../../redux/selectors/auth";
import { REDUX_HANDLE_LOG_OUT } from "../../redux/slices/authSlice";
import { useAlert } from "../../contexts/Alert";
import axios from "axios";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { userInfo } = useSelector(authData);
  const { firstName, lastName, photoURL } = userInfo;
  const dispatch = useDispatch();
  const { triggerAlert } = useAlert();

  const handleLogOut = async () => {
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );

      if (resp) {
        dispatch(REDUX_HANDLE_LOG_OUT());
        triggerAlert({
          type: "success",
          message: "Log out successful",
        });
      }
    } catch (error) {
      console.error(error, "error logging out");
      triggerAlert({
        type: "error",
        message: "Something went wrong while logging you out !",
      });
    }
  };

  return (
    <div className="navbar bg-neutral shadow-lg px-4 sticky top-0 z-10">
      <div className="flex-1">
        <Link to={`/feed`} className="btn btn-ghost text-xl text-accent">
          DevTinder
        </Link>
      </div>
      <div className="mr-4">Welcome ! {firstName}</div>
      <div className="flex gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={photoURL} />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-accent-content rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              {/* goes to my profile */}
              <a className="font-extrabold text-lg border-2 border-accent mb-8 text-accent cursor-auto bg-base-200">
                {firstName} {lastName}
              </a>
            </li>
            <li>
              {/* goes to my feed */}
              <Link to={`/profile`}>My Profile</Link>
            </li>
            <li>
              {/* goes to my feed */}
              <Link to={"/feed"}>My Feed</Link>
            </li>
            <li>
              {/* goes to my matches */}
              <Link to={"/matches"}>My Matches</Link>
            </li>
            <li>
              {/* goes to my connection requests */}
              <Link to={`/requests`}>My Connection Requests</Link>
            </li>
            <li className="mt-8 bg-accent text-neutral font-bold rounded-edges">
              <button
                onClick={handleLogOut}
                className="w-full text-center text-base"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
