import axiosClient from './axiosClient';

const roadMapApi = {
    getRoadMap: (params) => {
        const url = "/RoadMap";
        return axiosClient.get(url);
    },
    updateRoadMap: (id, params) => {
        const url = `/RoadMap/${id}`;
        return axiosClient.put(url, params);
    }
}

export default roadMapApi;