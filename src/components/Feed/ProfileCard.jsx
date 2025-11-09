import axios from "axios";
import { useAlert } from "../../contexts/Alert";
import { REDUX_REMOVE_FROM_FEED_BY_ID } from "../../redux/slices/feedSlice";
import { useDispatch } from "react-redux";

const ProfileCard = ({ profileData }) => {
  const {
    _id,
    firstName,
    lastName,
    age,
    gender,
    photoURL,
    about,
    skills = [],
  } = profileData;

  const { triggerAlert } = useAlert();
  const dispatch = useDispatch();

  const sendRequest = async ({ status, userId }) => {
    try {
      const resp = await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/connections/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      if (resp.status === 201) {
        dispatch(REDUX_REMOVE_FROM_FEED_BY_ID({ userToBeRemoved: userId }));
        triggerAlert({
          type: "success",
          message: `Connection request ${status.toLowerCase()} successfully`,
        });
      }
    } catch (error) {
      console.error(error, "error in processing connection request");
      triggerAlert({
        type: "error",
        message:
          "Something went wrong while processing your connection request",
      });
    }
  };

  return (
    <div className="card w-full max-w-sm bg-base-100 text-neutral-content shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/10 hover:border-accent cursor-pointer min-h-80">
      <figure>
        <img src={photoURL} alt={`${firstName} ${lastName}`} />
      </figure>

      <div className="card-body items-center text-center">
        <h2 className="card-title text-accent text-2xl font-bold">
          {firstName} {lastName}
        </h2>

        <p className="text-sm text-info">{`${age} years • ${gender}`}</p>

        <p className="text-gray-300 mt-2 line-clamp-3">{about}</p>

        {skills?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {skills.slice(0, 6).map((skill, idx) => (
              <span
                key={idx}
                className="badge badge-accent badge-outline text-sm px-3 py-2"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-between gap-8 w-full mt-8">
          <button
            className="btn btn-outline btn-error"
            onClick={() => {
              sendRequest({ status: "ignored", userId: _id });
            }}
          >
            Ignore
          </button>
          <button
            className="btn btn-outline btn-accent"
            onClick={() => {
              sendRequest({ status: "interested", userId: _id });
            }}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
