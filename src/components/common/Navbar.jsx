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
    <div className="navbar bg-neutral shadow-lg px-4">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DevTinder</a>
      </div>
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              {/* goes to my profile */}
              <a className="font-extrabold text-lg border-2 border-accent mb-8 text-accent cursor-auto">
                {firstName} {lastName}
              </a>
            </li>
            <li>
              {/* goes to my feed */}
              <a cl>My Profile</a>
            </li>
            <li>
              {/* goes to my feed */}
              <Link to={"/feed"}>My Feed</Link>
            </li>
            <li>
              {/* goes to my matches */}
              <Link to={"/match"}>My Matches</Link>
            </li>
            <li>
              {/* goes to my connection requests */}
              <a className="justify-between">My Connection Requests</a>
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
