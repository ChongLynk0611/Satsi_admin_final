import axiosClient from './axiosClient';

const categoryApi = {
    getCategories:() => {
        const url ='/Categories';
        return axiosClient.get(url);
    },
    getCategory:(id) => {
        const url=`/Categories/${id}`;
        return axiosClient.get(url);
    },
    postCategory:(params) => {
        const url= '/Categories';
        return axiosClient.post(url, params);
    },
    deleteCategory:(params) => {
        const url =`/Categories/${params}`;
        return axiosClient.delete(url);
    },
    updateCategory: (id ,params) => {
        const url = `/Categories/${id}`;
        return axiosClient.put(url, params);
    }
}

export default categoryApi;