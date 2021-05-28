import axiosClient from './axiosClient';

const ImageApi ={
    getImages: (params) => {
        const url = "/Images";
        return axiosClient.get(url);
    },
    postImage:(params) =>{
        const url = "/Images";
        return axiosClient.post(url, params);
    },
    deleteImage: (params) => {
        const url = `/Images/${params}`;
        return axiosClient.delete(url);
    }
}

export default ImageApi;