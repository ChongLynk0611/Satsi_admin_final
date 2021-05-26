import axiosClient from './axiosClient';

const introApi = {
    getIntro: (params) => {
        const url = "/Introduction";
        return axiosClient.get(url);
    },
    updateIntro: (id, params) => {
        const url = `/Introduction/${id}`;
        return axiosClient.put(url, params);
    }
}

export default introApi;