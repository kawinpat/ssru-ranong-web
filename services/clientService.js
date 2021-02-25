import axios from "axios";
import Vue from "vue";

const apiUrl = process.env.VUE_APP_BASEURL;
const loaderShow = () => {
    return Vue.$loading.show({
        // Optional parameters
        container: null,
        canCancel: false,
        onCancel: null,
    });
};

class clientService {
    static async get(path) {
        let loader = loaderShow();
        try {
            const res = await axios.get(`${apiUrl}/${path}`);
            loader.hide();
            return res.data;
        } catch (error) {
            console.log(
                `Call clientService get service with ${path} failure and error msg is  ${error}`
            );
            return null;
        }
    }
    static async post(path, item) {
        let loader = loaderShow();
        try {
            const res = await axios.post(`${apiUrl}/${path}`, item);
            loader.hide();
            return res.data;
        } catch (error) {
            console.log(
                `Call clientService post service with ${apiUrl}/${path} failure and error msg is  ${error}`
            );
            return null;
        }
    }
}
export default clientService;