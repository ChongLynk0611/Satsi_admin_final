import axiosClient from './axiosClient';

const newsApi = {
    getNews:() => {
        const url ='/posts';
        return axiosClient.get(url);
    },
    // getCategory:(id) => {
    //     const url=`/Categories/${id}`;
    //     return axiosClient.get(url);
    // },
    postNews:(params) => {
        const url= '/posts';
        return axiosClient.post(url, params);
    },
    deleteNews:(params) => {
        const url =`/posts/${params}`;
        return axiosClient.delete(url);
    },
    // updateCategory: (id ,params) => {
    //     const url = `/Categories/${id}`;
    //     return axiosClient.put(url, params);
    // }
}

export default newsApi;