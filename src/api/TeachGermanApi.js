import axiosClient from './axiosClient';

const teachGermanApi = {
    getTeachGerman: (params) => {
        const url = "/TeachGerman";
        return axiosClient.get(url);
    },
    updateTeachGerman: (id, params) => {
        const url = `/TeachGerman/${id}`;
        return axiosClient.put(url, params);
    }
}

export default teachGermanApi;