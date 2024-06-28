import axios from "axios";

export const api = async (url, method, body) => {
    axios.defaults.baseURL = "http://localhost:8080";
    try {
        const res = await axios({
            url,
            method,
            data: body,
            headers: {
                // Authorization: `jwt ${localStorage.getItem("token")}`,
                Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhbHdrMTFAbmF2ZXIuY29tIiwiZW1haWwiOiJhbHdrMTFAbmF2ZXIuY29tIiwiaWQiOjUsIm5pY2tuYW1lIjoi64WVIiwiaW1hZ2UiOiJodHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vZG93bmxvYWQvc3RvcmFnZS92MS9iL2Jvb3RqYXJfZ2NzL28vMzcyMWQ0MDktYmY4MS00MWZjLTg2OWMtYWY5MWJlYzlkNjk2LmdpZj9nZW5lcmF0aW9uPTE3MTk0NDk2Njc0MTEzMjcmYWx0PW1lZGlhIiwiZXhwIjo3NzE5NDU0MDA2fQ.Y04xMe23pi-2WFads0c3amYqO0KX-4t5uN0PCFRPO9ths1EWkMqByRFEs-fFyN0b`,
            },
        });
        return res;
    } catch (error) {
        console.error("Error:", error);
        throw error; // 에러를 다시 throw하여 상위 함수에서 처리할 수 있도록 함
    }
};

export const api_user = async (url, method, body) => {
    axios.defaults.baseURL = "http://192.168.0.27:8081";
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