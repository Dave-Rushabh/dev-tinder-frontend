import { useDispatch, useSelector } from "react-redux";
import { requestsData } from "../../redux/selectors/requests";
import { useEffect, useState } from "react";
import { useAlert } from "../../contexts/Alert";
import axios from "axios";
import { REDUX_SET_REQUESTS } from "../../redux/slices/requestsSlice";
import Loader from "../common/Loader";
import { formatDate } from "../../utils";

const ConnectionRequests = () => {
  const dispatch = useDispatch();
  const { data: requests } = useSelector(requestsData);
  const [isLoading, setIsLoading] = useState(false);
  const { triggerAlert } = useAlert();

  useEffect(() => {
    const fetchMyRequests = async () => {
      setIsLoading(true);
      try {
        const resp = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/profile/connections/received-requests`,
          { withCredentials: true }
        );

        dispatch(REDUX_SET_REQUESTS({ data: resp?.data || [] }));
      } catch (error) {
        console.error(error, "error fetching the matches");
        triggerAlert({
          type: "error",
          message:
            "Could not fetch your matches at this moment; please try again later",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyRequests();
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="min-h-screen custom-container">
          {requests && Array.isArray(requests) && requests.length ? (
            <ul className="list bg-base-100">
              <li className="p-4 pb-2 text-2xl text-white! opacity-90 tracking-wide">
                Connection Requests
              </li>

              {requests.map((request) => {
                const { firstName, lastName, photoURL } = request.fromUserId;
                const { _id, createdAt } = request;
                return (
                  <li className="list-row" key={_id}>
                    <div>
                      <img className="w-48 h-32 rounded-box" src={photoURL} />
                    </div>
                    <div className="list-col-grow">
                      <div className="w-full text-xl text-accent">
                        {firstName}&nbsp;{lastName}
                      </div>
                      <div className="text-base font-semibold opacity-70">
                        request received on {formatDate(createdAt)}
                      </div>
                      <div className="mt-8 flex gap-4">
                        <button className="btn btn-outline btn-error">
                          Reject
                        </button>
                        <button className="btn btn-outline btn-accent">
                          Reject
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="text-center flex items-center justify-center min-h-80">
              No Requests available !
            </div>
          )}
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ConnectionRequests;
