import axios from "axios";
const axiosInstance = axios.create({
	// baseURL: "http://127.0.0.1:5001/e-clone-80d00/us-central1/api",
	baseURL: "https://api-c2mxjkggea-uc.a.run.app",
});
export { axiosInstance };