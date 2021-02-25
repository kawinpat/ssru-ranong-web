import axios from "axios";

export default () => {
    return axios.create({
        baseUrl: process.env.PORT,
    })
}