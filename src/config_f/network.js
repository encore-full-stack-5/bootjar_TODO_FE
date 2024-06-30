import axios from "axios";

export const api = async (url, method, body) => {
    // axios.defaults.baseURL = "http://34.173.194.250";
    axios.defaults.baseURL = "http://34.121.86.244";
    try {
        const res = await axios({
            url,
            method,
            data: body,
            headers: {
                // Authorization: `jwt ${localStorage.getItem("token")}`,
                Authorization: `Bearer ${localStorage.token}`,
            },
        });
        return res;
    } catch (error) {
        console.error("Error:", error);
        throw error; // 에러를 다시 throw하여 상위 함수에서 처리할 수 있도록 함
    }
};

export const api_user = async (url, method, body) => {
    axios.defaults.baseURL = "http://34.121.86.244";
    try {
        const res = await axios({
            url,
            method,
            data: body,
        });
        return res;
    } catch (error) {
        console.error("Error:", error);
        throw error; // 에러를 다시 throw하여 상위 함수에서 처리할 수 있도록 함
    }
};