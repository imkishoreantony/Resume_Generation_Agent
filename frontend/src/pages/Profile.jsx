import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import ChangePasswordModal from "../components/ChangePasswordModal";
import EditProfileModal from "../components/EditProfileModal";

function Profile() {
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("profile/");
      setProfile(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const uploadProfilePicture = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("profile_picture", file);

    try {
      const response = await api.put(
        "profile/picture/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfile({
        ...profile,
        profile_picture: response.data.profile_picture,
      });

      toast.success("Profile picture updated!");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-5 text-lg text-gray-600">
            Loading Profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl p-10">

          {/* Avatar */}

          <div className="flex flex-col items-center">

            <div
              className="relative cursor-pointer group"
              onClick={() => fileInputRef.current.click()}
            >

              {profile.profile_picture ? (

                <img
                  src={profile.profile_picture}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />

              ) : (

                <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center text-5xl text-white font-bold shadow-lg">
                  {profile.username.charAt(0).toUpperCase()}
                </div>

              )}

              {/* Hover Overlay */}

              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">

                <span className="text-white text-sm font-semibold">
                  📷 Change
                </span>

              </div>

            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={uploadProfilePicture}
            />

            <h1 className="text-4xl font-bold mt-6">
              {profile.username}
            </h1>

            <p className="text-gray-500 mt-2">
              {profile.email}
            </p>

            <span className="mt-4 bg-green-100 text-green-700 px-5 py-2 rounded-full">
              Member since {profile.date_joined}
            </span>

          </div>

          {/* Statistics */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">

            <div className="bg-blue-100 rounded-2xl p-6 text-center">
              <h2 className="text-4xl font-bold text-blue-600">
                {profile.total_resumes}
              </h2>
              <p className="mt-2">Resumes</p>
            </div>

            <div className="bg-green-100 rounded-2xl p-6 text-center">
              <h2 className="text-4xl font-bold text-green-600">
                {profile.ai_reviews}
              </h2>
              <p className="mt-2">AI Reviews</p>
            </div>

            <div className="bg-purple-100 rounded-2xl p-6 text-center">
              <h2 className="text-4xl font-bold text-purple-600">
                {profile.ai_generated}
              </h2>
              <p className="mt-2">AI Generated</p>
            </div>

            <div className="bg-pink-100 rounded-2xl p-6 text-center">
              <h2 className="text-4xl font-bold text-pink-600">
                {profile.cover_letters}
              </h2>
              <p className="mt-2">Cover Letters</p>
            </div>

          </div>

          {/* Actions */}

          <div className="grid md:grid-cols-3 gap-4 mt-12">

            <button
              onClick={() => setShowEditModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
            >
              ✏ Edit Profile
            </button>

            <button
            onClick={() => setShowPasswordModal(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl"
          >
            🔒 Change Password
          </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-xl"
            >
              ← Back
            </button>

          </div>

        </div>

      </div>

      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        profile={profile}
        onUpdate={setProfile}
      />

    </div>
  );
}

export default Profile;