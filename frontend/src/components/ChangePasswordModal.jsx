import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

/* ---------------- Password Input Component ---------------- */

function PasswordInput({
  label,
  value,
  onChange,
  show,
  setShow,
}) {
  return (
    <div className="mb-5">

      <label className="block font-semibold mb-2">
        {label}
      </label>

      <div className="relative">

        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="w-full border rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>

      </div>

    </div>
  );
}

/* ---------------- Main Modal ---------------- */

function ChangePasswordModal({ isOpen, onClose }) {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

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
        error.response?.data?.error ||
        "Failed to change password"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl w-[95%] max-w-lg p-8"
      >

        <h2 className="text-3xl font-bold text-blue-600 mb-8">
          🔒 Change Password
        </h2>

        <PasswordInput
          label="Current Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          show={showOld}
          setShow={setShowOld}
        />

        <PasswordInput
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          show={showNew}
          setShow={setShowNew}
        />

        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          show={showConfirm}
          setShow={setShowConfirm}
        />

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "🔒 Update Password"}
          </button>

        </div>

      </div>

    </div>

  );

}

export default ChangePasswordModal;