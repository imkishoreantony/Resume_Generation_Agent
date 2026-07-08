import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

function EditProfileModal({ isOpen, onClose, profile, onUpdate }) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [saving, setSaving] = useState(false);
    useEffect(() => {

    const handleEsc = (e) => {

        if (e.key === "Escape") {

            onClose();

        }

    };

    window.addEventListener("keydown", handleEsc);

    return () => {

        window.removeEventListener("keydown", handleEsc);

    };

}, [onClose]);
    useEffect(() => {

        if (profile) {

            setUsername(profile.username);
            setEmail(profile.email);

        }

    }, [profile]);

    if (!isOpen) return null;

    const saveProfile = async () => {

        try {

            setSaving(true);

            const response = await api.put("profile/", {
                username,
                email
            });

            toast.success(response.data.message);

            onUpdate({
                ...profile,
                username,
                email
            });

            onClose();

        }

        catch (error) {

            console.error(error);

            toast.error("Failed to update profile");

        }

        finally {

            setSaving(false);

        }

    };

    return (

    <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn"
        onClick={onClose}
    >

        <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl w-[92%] max-w-lg p-8 shadow-2xl animate-scaleIn"
        >

            <h1 className="text-3xl font-bold text-blue-600 mb-8">

                ✏ Edit Profile

            </h1>

            <label className="font-semibold">

                Username

            </label>

            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-2 mb-5 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="font-semibold">

                Email

            </label>

            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end gap-4 mt-8">

                <button
                    onClick={onClose}
                    className="px-6 py-3 rounded-xl bg-gray-300 hover:bg-gray-400"
                >
                    Cancel
                </button>

                <button
                    onClick={saveProfile}
                    disabled={saving}
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
                >
                    {saving ? "Saving..." : "💾 Save Changes"}
                </button>

            </div>

        </div>

    </div>

);

}

export default EditProfileModal;