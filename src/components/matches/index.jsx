import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { matchesData } from "../../redux/selectors/matches";
import { useAlert } from "../../contexts/Alert";
import axios from "axios";
import { REDUX_SET_MATCHES } from "../../redux/slices/matchesSlice";
import { formatDate } from "../../utils";
import Loader from "../common/Loader";

const Matches = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { data: matches } = useSelector(matchesData);
  const { triggerAlert } = useAlert();

  useEffect(() => {
    const fetchMyMatches = async () => {
      setIsLoading(true);
      try {
        const resp = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/profile/my-connections`,
          { withCredentials: true }
        );

        dispatch(REDUX_SET_MATCHES({ data: resp?.data || [] }));
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

    fetchMyMatches();
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="min-h-screen custom-container">
          {matches && Array.isArray(matches) && matches.length ? (
            <ul className="list bg-base-100">
              <li className="p-4 pb-2 text-2xl text-white! opacity-90 tracking-wide">
                My Matches
              </li>

              {matches.map((match) => {
                const { firstName, lastName, photoURL } = match.connectionInfo;
                const { _id, createdAt } = match;
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
                        connected since {formatDate(createdAt)}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="text-center flex items-center justify-center min-h-80">
              No Matches available !
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

export default Matches;
