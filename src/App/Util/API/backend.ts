import Axios from "axios";

const AxiosBase = Axios.create({
    baseURL: "https://bizfund-backend.herokuapp.com",
});

export default AxiosBase;
