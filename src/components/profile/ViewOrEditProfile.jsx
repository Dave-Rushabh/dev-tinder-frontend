import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useAlert } from "../../contexts/Alert";
import { REDUX_HANDLE_LOG_IN } from "../../redux/slices/authSlice"; // update the userInfo after edit
import { authData } from "../../redux/selectors/auth";
import { useNavigate } from "react-router-dom";

const ViewOrEditProfile = () => {
  const dispatch = useDispatch();
  const { triggerAlert } = useAlert();

  const { userInfo } = useSelector(authData);

  const [editData, setEditData] = useState({
    photoURL: userInfo?.photoURL || "",
    about: userInfo?.about || "",
    skills: (userInfo?.skills || []).join(", "),
  });

  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updatedData = {
        photoURL: editData.photoURL.trim(),
        about: editData.about.trim(),
        skills: editData.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const resp = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/profile/edit`,
        updatedData,
        { withCredentials: true }
      );

      dispatch(REDUX_HANDLE_LOG_IN({ user: resp.data }));
      triggerAlert({
        type: "success",
        message: "Profile updated successfully!",
      });
      navigate("/feed");
    } catch (err) {
      console.error(err);
      triggerAlert({
        type: "error",
        message: err.response?.data || "Error updating profile",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!userInfo) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-error">
        No userInfo data found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-start py-10">
      <div className="card w-full max-w-3xl bg-neutral text-neutral-content shadow-2xl border border-white/10 p-8">
        <h2 className="text-3xl font-bold text-accent text-center mb-6">
          My Profile
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <img
              src={editData.photoURL || "/default-avatar.png"}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-accent object-cover mb-4"
            />
            <input
              type="text"
              className="input input-bordered bg-white/10 border-white/20 text-white w-60 text-sm"
              value={editData.photoURL}
              onChange={(e) =>
                setEditData({ ...editData, photoURL: e.target.value })
              }
              placeholder="Profile Image URL"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-accent text-sm">Full Name</label>
              <p className="text-lg font-semibold">
                {userInfo.firstName} {userInfo.lastName}
              </p>
            </div>
            <div>
              <label className="block text-accent text-sm">Email</label>
              <p className="text-gray-300">{userInfo.emailId}</p>
            </div>
            <div>
              <label className="block text-accent text-sm">Age / Gender</label>
              <p className="text-gray-300">
                {userInfo.age} years • {userInfo.gender}
              </p>
            </div>
          </div>
        </div>

        {/* Editable fields */}
        <form onSubmit={handleSave} className="mt-8 space-y-6">
          <div>
            <label className="block text-accent text-sm mb-1">About</label>
            <textarea
              className="textarea textarea-bordered w-full bg-white/10 border-white/20 text-white"
              rows="3"
              value={editData.about}
              onChange={(e) =>
                setEditData({ ...editData, about: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-accent text-sm mb-1">
              Skills (comma-separated)
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-white/10 border-white/20 text-white"
              value={editData.skills}
              onChange={(e) =>
                setEditData({ ...editData, skills: e.target.value })
              }
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={saving}
              className="btn bg-accent text-black px-6"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewOrEditProfile;
