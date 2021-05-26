import axios from 'axios';
import axiosClient from './axiosClient';

const bannerApi ={
    getBanner: (params) => {
        const url = "/Banners";
        return axiosClient.get(url);
    },
    postBanner:(params) =>{
        const url = "/Banners";
        return axiosClient.post(url, params);
    },
    deleteBanner: (params) => {
        const url = `/Banners/${params}`;
        // console.log(url);
        return axiosClient.delete(url);
    }
}

export default bannerApi;