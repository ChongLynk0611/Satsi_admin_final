import axiosClient from './axiosClient';

const commitmentApi = {
    getCommitment: (params) => {
        const url = "/Commitment";
        return axiosClient.get(url);
    },
    deleteCommitment: (id) => {
        const url = `/Commitment/${id}`;
        return axiosClient.delete(url);
    },
    postCommitment:(params) => {
        const url = "/Commitment";
        return axiosClient.post(url, params);
    },
    updateCommitment:(id, params) => {
        const url = `/Commitment/${id}`;
        return axiosClient.put(url, params);
    }
}

export default commitmentApi;