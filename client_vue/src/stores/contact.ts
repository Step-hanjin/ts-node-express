
import { defineStore } from "pinia";
import {
    fetchContactsApi,
    createContactApi,
    updateContactApi,
    deleteContactApi
} from '@/services/contact';

import type { Contact } from "@/types";

interface ContactState {
    contacts: Contact[]
}
const initalState = {
    contacts: []
};

export const useContactStore = defineStore('contact', {
    state: (): ContactState => (initalState),
    actions: {
        async getContacts() {
            const response = await fetchContactsApi();
            this.contacts= response;
        },
        async addContact(contact: Contact) {
            await createContactApi(contact);
            this.getContacts();
        },
        async updateContact(contact: Contact) {
            await updateContactApi(contact);
            this.getContacts();
        },
        async deleteContact(id: number) {
            await deleteContactApi(id);
            this.getContacts();
        }
    }
});