import axiosClient from './axiosClient';

const newsApi = {
    getNews:() => {
        const url ='/posts';
        return axiosClient.get(url);
    },
    getNewsById:(id) => {
        const url=`/posts/${id}`;
        return axiosClient.get(url);
    },
    postNews:(params) => {
        const url= '/posts';
        return axiosClient.post(url, params);
    },
    deleteNews:(params) => {
        const url =`/posts/${params}`;
        return axiosClient.delete(url);
    },
    updateNews: (id ,params) => {
        const url = `/posts/${id}`;
        return axiosClient.put(url, params);
    }
}

export default newsApi;