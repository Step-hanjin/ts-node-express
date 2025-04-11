import { apiClient } from './api';

export const fetchCountries = async () => {
    const response = await apiClient.get('/countries');
    return response.data;
};

export const createCountry = async (country: Country) => {
    const response = await apiClient.post('/countries', country);
    return response.data;
}

export const updateCountry = async (country: Country) => {
    const response = await apiClient.put(`/countries/${country.id}`, country);
    return response.data;
}

export const deleteCountry = async (id: number) => {
    const response = await apiClient.delete(`/countries/${id}`);
    return response;
}