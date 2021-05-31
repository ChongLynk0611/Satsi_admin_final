import axiosClient from './axiosClient';

const techApi = {
    getTech: (params) => {
        const url = "/Tech";
        return axiosClient.get(url);
    },
    updateTech: (id, params) => {
        const url = `/Tech/${id}`;
        return axiosClient.put(url, params);
    }
}

export default techApi;