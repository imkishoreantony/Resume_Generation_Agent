import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

function ChangePasswordModal({ isOpen, onClose }) {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const changePassword = async () => {

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {

      setLoading(true);

      const response = await api.put(
        "profile/change-password/",
        {
          old_password: oldPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }
      );

      toast.success(response.data.message);

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      onClose();

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.error || "Failed to change password"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn"
      onClick={onClose}
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl w-[92%] max-w-lg p-8 animate-scaleIn"
      >

        <h1 className="text-3xl font-bold text-blue-600 mb-8">
          🔒 Change Password
        </h1>

        {/* Current Password */}

        <label className="font-semibold">
          Current Password
        </label>

        <div className="flex mt-2 mb-5">

          <input
            type={showOld ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="flex-1 border rounded-l-xl p-3"
          />

          <button
            onClick={() => setShowOld(!showOld)}
            className="px-4 bg-gray-200 rounded-r-xl"
          >
            {showOld ? "🙈" : "👁"}
          </button>

        </div>

        {/* New Password */}

        <label className="font-semibold">
          New Password
        </label>

        <div className="flex mt-2 mb-5">

          <input
            type={showNew ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="flex-1 border rounded-l-xl p-3"
          />

          <button
            onClick={() => setShowNew(!showNew)}
            className="px-4 bg-gray-200 rounded-r-xl"
          >
            {showNew ? "🙈" : "👁"}
          </button>

        </div>

        {/* Confirm Password */}

        <label className="font-semibold">
          Confirm Password
        </label>

        <div className="flex mt-2">

          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="flex-1 border rounded-l-xl p-3"
          />

          <button
            onClick={() => setShowConfirm(!showConfirm)}
            className="px-4 bg-gray-200 rounded-r-xl"
          >
            {showConfirm ? "🙈" : "👁"}
          </button>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={changePassword}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            {loading ? "Updating..." : "🔒 Update Password"}
          </button>

        </div>

      </div>

    </div>

  );

}

export default ChangePasswordModal;