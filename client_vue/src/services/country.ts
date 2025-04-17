import apiClient from './api';
import type { Country } from '@/types';

export const fetchCountriesApi = async () => {
    const response = await apiClient.get('/countries');
    return response.data;
} 

export const createCountryApi = async (country: Country) => {
    const response = await apiClient.post('/countries', country);
    return response.data;
}

export const updateCountryApi = async (country: Country) => {
    const response = await apiClient.put(`/countries/${country.id}`, country);
    return response.data;
}

export const deleteCountryApi = async (id: number) => {
    const response = await apiClient.delete(`/countries/${id}`);
    return response;
}