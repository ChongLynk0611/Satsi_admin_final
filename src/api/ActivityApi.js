import axiosClient from './axiosClient';

const ActivityApi = {
    getActivity: (params) => {
        const url = "/Activity";
        return axiosClient.get(url);
    },
    updateActivity: (id, params) => {
        const url = `/Activity/${id}`;
        return axiosClient.put(url, params);
    }
}

export default ActivityApi;