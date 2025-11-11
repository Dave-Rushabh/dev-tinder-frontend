import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { feedData } from "../../redux/selectors/feed";
import axios from "axios";
import { useAlert } from "../../contexts/Alert";
import Loader from "../common/Loader";
import {
  REDUX_FETCH_NEXT_PAGE,
  REDUX_SET_FEED,
} from "../../redux/slices/feedSlice";
import ProfileCard from "./ProfileCard";

const Feed = () => {
  const [loading, isLoading] = useState(false);

  const { feed, pagination } = useSelector(feedData);
  const { currentPage: page, limit, totalUsers } = pagination;
  const { triggerAlert } = useAlert();
  const dispatch = useDispatch();

  const fetchFeed = async () => {
    isLoading(true);
    try {
      const resp = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/feed?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );

      if (resp) {
        dispatch(
          REDUX_SET_FEED({
            data: resp?.data?.users || [],
            totalUsers: resp?.data?.totalUsers || 0,
          })
        );
      }
    } catch (error) {
      console.error(error, "error loading the feed");
      triggerAlert({
        type: "error",
        message: "Failed to load the feed for you at this moment :(",
      });
    } finally {
      isLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (Array.isArray(feed) && feed.length === 0) {
    dispatch(REDUX_FETCH_NEXT_PAGE({ nextPage: 1 }));
  }

  return (
    <>
      {loading ? (
        <div className="w-full min-h-screen flex items-center justify-center">
          <Loader size="xl" />
        </div>
      ) : (
        <div className="custom-container flex  flex-col items-center gap-8">
          {feed && Array.isArray(feed) && feed.length ? (
            <div className="stack w-80">
              {feed.slice(0, 1).map((profile) => {
                const { _id } = profile;

                return <ProfileCard key={_id} profileData={profile} />;
              })}{" "}
            </div>
          ) : (
            <div className="min-h-screen flex items-center -mt-16 justify-center flex-col gap-8">
              Your Feed is Empty !
              {totalUsers > 0 ? (
                <button
                  className="btn btn-info cursor-pointer"
                  onClick={fetchFeed}
                >
                  Load More
                </button>
              ) : null}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Feed;
