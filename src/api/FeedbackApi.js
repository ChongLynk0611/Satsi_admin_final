import axiosClient from './axiosClient';

const feedbackApi = {
    getFeedbacks: (params) => {
        const url = "/Feedbacks";
        return axiosClient.get(url);
    },
    deleteFeedback: (id) => {
        const url = `/Feedbacks/${id}`;
        return axiosClient.delete(url);
    },
    postFeedback:(params) => {
        const url = "/Feedbacks";
        return axiosClient.post(url, params);
    },
    updateFeedback:(id, params) => {
        const url = `/Commitment/${id}`;
        return axiosClient.put(url, params);
    }
}

export default feedbackApi;