import apiClient from './api';
import type { Contact } from '@/types';

export const fetchContactsApi = async () => {
    const response = await apiClient.get('/contacts');
    return response.data;
} 

export const createContactApi = async (country: Contact) => {
    const response = await apiClient.post('/contacts', country);
    return response.data;
}

export const updateContactApi = async (country: Contact) => {
    const response = await apiClient.put(`/contacts/${country.id}`, country);
    return response.data;
}

export const deleteContactApi = async (id: number) => {
    const response = await apiClient.delete(`/contacts/${id}`);
    return response;
}