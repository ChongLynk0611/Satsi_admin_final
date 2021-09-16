import axiosClient from './axiosClient';

const AirnewsApi = {
    getAirnewsApi:() => {
        const url ='/Airnews';
        return axiosClient.get(url);
    },
    getAirNewsById:(id) => {
        const url=`/Airnews/${id}`;
        return axiosClient.get(url);
    },
    postAirNews:(params) => {
        const url= '/Airnews';
        return axiosClient.post(url, params);
    },
    deleteAirNews:(params) => {
        const url =`/Airnews/${params}`;
        return axiosClient.delete(url);
    },
    updateAirNews: (id ,params) => {
        const url = `/Airnews/${id}`;
        return axiosClient.put(url, params);
    }
}

export default AirnewsApi;