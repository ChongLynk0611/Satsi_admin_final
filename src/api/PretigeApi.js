import axiosClient from './axiosClient';

const pretigeApi = {
    getPretige: (params) => {
        const url = "/Pretige";
        return axiosClient.get(url);
    },
    deletePretige: (id) => {
        const url = `/Pretige/${id}`;
        return axiosClient.delete(url);
    }
    // postCommitment:(params) => {
    //     const url = "/Commitment";
    //     return axiosClient.post(url, params);
    // },
    // updateCommitment:(id, params) => {
    //     const url = `/Commitment/${id}`;
    //     return axiosClient.put(url, params);
    // }
}

export default pretigeApi;