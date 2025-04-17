import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useContactStore } from '@/stores/contact';
import type { Contact } from '@/types'

export function useContactManager() {
    const contactStore = useContactStore();

    const { contacts } = storeToRefs(contactStore);

    onMounted(async () => {
        if (contacts.value.length === 0) {
            await contactStore.getContacts();
        }
    });

    async function loadContacts() {
        await contactStore.getContacts();
    }

    async function createOrUpdate (contact: Contact) {
        if (contact.id) {
            await contactStore.updateContact(contact);
        } else {
            await contactStore.addContact(contact);
        }
    }

    async function removeContact(id: number) {
        await contactStore.deleteContact(id);
    }

    return {
        contacts,
        loadContacts,
        createOrUpdate,
        removeContact
    }
}