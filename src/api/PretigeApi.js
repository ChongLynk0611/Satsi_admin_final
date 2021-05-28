import axiosClient from './axiosClient';

const pretigeApi = {
    getPretige: (params) => {
        const url = "/Pretige";
        return axiosClient.get(url);
    },
    deletePretige: (id) => {
        const url = `/Pretige/${id}`;
        return axiosClient.delete(url);
    },
    postpretige:(params) => {
        const url = "/Pretige";
        return axiosClient.post(url, params);
    },
    updatePretige:(id, params) => {
        const url = `/Pretige/${id}`;
        return axiosClient.put(url, params);
    }
}

export default pretigeApi;