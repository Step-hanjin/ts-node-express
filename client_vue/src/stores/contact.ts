
import { defineStore } from "pinia";
import {
    fetchContactsApi,
    createContactApi,
    updateContactApi,
    deleteContactApi
} from '@/services/contact';

import type { Contact, TableColumn } from "@/types";

interface ContactState {
    contacts: Contact[],
    columns: TableColumn[]
}
const initalState = {
    contacts: [],
    columns: [
        {field:'id', header:'ID'},
        {field:'name', header:'Name'},
        {field:'country.name', header:'Country'},
        {field:'email', header:'Email'},
        {field:'phone', header:'Phone'},
        {field:'note', header:'Note'},
    ]
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