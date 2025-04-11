import { apiClient } from './api';

export const fetchContacts = async () => {
    const response = await apiClient.get('/contacts');
    return response.data;
};

export const createContact = async (contact: Contact) => {
    const response = await apiClient.post('/contacts', contact);
    return response.data;
}

export const updateContact = async (contact: Contact) => {
    const response = await apiClient.put(`/contacts/${contact.id}`, contact);
    return response.data;
}

export const deleteContact = async (id: number) => {
    const response = await apiClient.delete(`/contacts/${id}`);
    return response;
}