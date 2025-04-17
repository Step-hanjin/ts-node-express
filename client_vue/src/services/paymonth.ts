import apiClient from './api';
import type { Paymonth } from '@/types';

export const fetchPaymonthsApi = async () => {
    const response = await apiClient.get('/paymonths');
    return response.data;
} 

export const createPaymonthApi = async (paymonth: Paymonth) => {
    const response = await apiClient.post('/paymonths', paymonth);
    return response.data;
}

export const updatePaymonthApi = async (paymonth: Paymonth) => {
    const response = await apiClient.put(`/paymonths/${paymonth.id}`, paymonth);
    return response.data;
}

export const deletePaymonthApi = async (id: number) => {
    const response = await apiClient.delete(`/paymonths/${id}`);
    return response;
}