import Axios from "axios";

const AxiosBase = Axios.create({
    baseURL: "http://localhost:3000",
});

export default AxiosBase;
