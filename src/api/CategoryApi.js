import axiosClient from './axiosClient';

const categoryApi = {
    getSubmenu: (param) => {
        const url ="/SubMenu";  // Nếu params là 1 string != null thì url = `Submenu/${param}`
        return axiosClient.get(url);
    },
    getCategories: () => {
        const url = "/Categories";
        return axiosClient.get(url);
    },
    getCategory: (params) => {
        const url = `/Categories/${params}`;
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
    updateCategory: (id,params) => {
        const url = `/Categories/${id}`;
        return axiosClient.put(url, params);
    }
}

export default categoryApi;