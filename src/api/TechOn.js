import axiosClient from './axiosClient';

const teachGermanApi = {
    getTeachOnl: (params) => {
        const url = "/TeachOnl";
        return axiosClient.get(url);
    },
    updateTeachOnl: (id, params) => {
        const url = `/TeachOnl/${id}`;
        return axiosClient.put(url, params);
    }
}

export default teachGermanApi;