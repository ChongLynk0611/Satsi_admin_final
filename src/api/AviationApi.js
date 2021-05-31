import axiosClient from './axiosClient';

const AviationApiApi = {
    getAviation:() => {
        const url ='/Aviation';
        return axiosClient.get(url);
    },
    updateAviation: (id ,params) => {
        const url = `/Aviation/${id}`;
        return axiosClient.put(url, params);
    }
}

export default AviationApiApi;