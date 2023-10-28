import axios from "axios";

const createHTTPClient = (customConfig = {}) => {
    const defaultConfig = {
        baseURL: 'http://localhost:8000',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
    }
    const clientConfig = { ...defaultConfig, ...customConfig }
    const HTTPClient = axios.create(clientConfig);
    return HTTPClient
}

export default createHTTPClient