import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
    baseURL: "http://quiz.1gb.ru/vue_ts_test",
    headers: {
        "Content-type": "application/json",
    },
});

export default apiClient;