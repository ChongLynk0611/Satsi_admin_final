import axiosClient from './axiosClient';

const viewApi = {
    getView: (params) => {
        const url = "/View";
        return axiosClient.get(url);
    },
    updateView: (id, params) => {
        const url = `/View/${id}`;
        return axiosClient.put(url, params);
    }
}

export default viewApi;