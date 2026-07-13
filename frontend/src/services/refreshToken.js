import axios from "axios";

const refreshToken = async () => {

    const refresh = localStorage.getItem("refresh");

    if (!refresh) return null;

    try {

        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}token/refresh/`,
            {
                refresh,
            }
        );

        localStorage.setItem(
            "access",
            response.data.access
        );

        return response.data.access;

    } catch {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        return null;

    }

};

export default refreshToken;