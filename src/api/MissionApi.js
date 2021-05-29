import axiosClient from './axiosClient';

const missionApi = {
    getMission: (params) => {
        const url = "/Mission";
        return axiosClient.get(url);
    },
    updateMission: (id, params) => {
        const url = `/Mission/${id}`;
        return axiosClient.put(url, params);
    }
}

export default missionApi;