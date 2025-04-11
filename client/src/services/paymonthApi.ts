import { apiClient } from './api';

export const fetchPaymonths = async () => {
    const response = await apiClient.get('/paymonths');
    return response.data;
};

export const createPaymonth = async (paymonth: Paymonth) => {
    const response = await apiClient.post('/paymonths', paymonth);
    return response.data;
}

export const updatePaymonth = async (paymonth: Paymonth) => {
    const response = await apiClient.put(`/paymonths/${paymonth.id}`, paymonth);
    return response.data;
}

export const deletePaymonth = async (id: number) => {
    const response = await apiClient.delete(`/paymonths/${id}`);
    return response;
}