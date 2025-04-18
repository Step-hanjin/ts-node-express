import { useContactManager } from '@/composables/stores/useContactManager'
import { useCountryManager } from '@/composables/stores/useCountryManager'
import type { TableColumn, Contact, FormField } from '@/types'
import { ref, computed } from 'vue'

export function useContact() {
    const {
        contacts: storeContacts,
        loadContacts,
        createOrUpdate,
        removeContact
    } = useContactManager();
    const { 
        countries: storeCountries,
        loadCountries 
    } = useCountryManager();
    const showModal = ref(false)
    const selectedContact = ref<Partial<Contact>>({});

    const contacts = computed(() => storeContacts.value)
    const countries = computed(() => 
        storeCountries.value.map(c => ({ label: c.name, value: c.id }))
    )

    const formFields = computed<FormField[]>(() => [
        { name: 'name', label: 'User name', type: 'text', placeholder: 'Enter user name', required: true},
        { name: 'country', label: 'Country', type: 'select', placeholder: 'Enter country', options: countries.value, required: true },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email', required: true},
        { name: 'phone', label: 'Phone', type: 'phone', placeholder: 'Enter phone', required: true},
        { name: 'note', label: 'Note', type: 'text', placeholder: 'Enter note', required: true },
    ])

    const tableColumns = computed<TableColumn[]>(() => [
        {field:'id', header:'ID'},
        {field:'name', header:'Name'},
        {field:'country.name', header:'Country'},
        {field:'email', header:'Email'},
        {field:'phone', header:'Phone'},
        {field:'note', header:'Note'},
    ])

    async function init() {
        await Promise.all([loadContacts(), loadCountries()])
    }
    function handleAdd() {
        selectedContact.value = {}
        showModal.value = true;
    }

    function handleEdit(contact: Contact) {
        selectedContact.value = { ...contact }
        showModal.value = true;
    }

    function handleDelete(contact: Contact) {
        removeContact(contact.id);
    }

    function handleSubmit(contact: Contact) {
        createOrUpdate(contact);
    }

    return {
        showModal,
        contacts,
        selectedContact,
        tableColumns,
        formFields,
        init,
        handleAdd,
        handleEdit,
        handleDelete,
        handleSubmit,
    }
}