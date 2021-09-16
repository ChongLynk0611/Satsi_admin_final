import axiosClient from './axiosClient';

const diagramApi ={
    getDiagram: (params) => {
        const url = "/Diagram";
        return axiosClient.get(url);
    },
    postDiagram:(params) =>{
        const url = "/Diagram";
        return axiosClient.post(url, params);
    },
    deleteDiagram: (params) => {
        const url = `/Diagram/${params}`;
        return axiosClient.delete(url);
    }
}

export default diagramApi;