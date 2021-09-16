import axiosClient from './axiosClient';

export const companiesApi = {
  getCompaniesCode: (params) => {
    const url = '/company';
    axiosClient.get(url, { params });
  },
};
