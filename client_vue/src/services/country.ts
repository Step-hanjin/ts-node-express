import apiClient form './api';
import type { Country } from '@/types';

export const fetchCountries = async () => {
    const response = await apiClient.get<Country[]>('/countries');
    return response.data;
} 

export const creatCountry = async (country: Country) => {
    const response = await apiClient.post('/countries', country);
    return response.data;
}

export const updateCountry = async (country: Country) => {
    const response = await apiClient.put(`/country/${country.id}`, country);
    return response.data;
}

export const deleteCountry = async (id: number) => {
    const response = await apiClient.delete(`/countries/${id}`);
    return response;
}