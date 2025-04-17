<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import type { Contact,  FormField } from '@/types'         

import FormModal from '@/components/Form/FormModal.vue'
import Table from '@components/Table/Table.vue'
import { useContactStore } from '@/stores/contact';
import { useCountryStore } from '@/stores/country';

const contactStore = useContactStore();
const countryStore = useCountryStore();

const showModal = ref(false);
const selectedContact = ref<Partial<Contact>>({});

onBeforeMount(async () => {
    await countryStore.getCountries();
    await contactStore.getContacts();
});

const contacts = computed(() => {
   return contactStore.contacts;
});

const countries = computed(() => {
    // console.log("computed", countryStore.countries);
   return countryStore.countries;
});

const items = computed<FormField[]>(() => [
  { name: 'name', label: 'User name', type: 'text', placeholder: 'Enter user name', required: true},
  { 
    name: 'country', 
    label: 'Country', 
    type: 'select', 
    placeholder: 'Enter country', 
    options: countries.value.map(country => ({
        label: country.name,
        value: country.id
    })),
    required: true
  },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email', required: true},
  { name: 'phone', label: 'Phone', type: 'phone', placeholder: 'Enter phone', required: true},
  { name: 'note', label: 'Note', type: 'text', placeholder: 'Enter note', required: true },
]);

function handleUpdateContact (contact: Contact) {
    selectedContact.value = {...contact};
    console.log("updateContact", selectedContact.value);
    showModal.value = true;
}

function handleDeleteContact (contact: Contact) {
    contactStore.deleteContact(contact.id);
}

function handleAddContact(newContact: Contact) {
    if(selectedContact.value?.id) {
        contactStore.updateContact(newContact);
    } else {
        contactStore.addContact(newContact);
    }
    console.log("handleAddContact", newContact);
    showModal.value = false;
}

function handleAdd() {
    selectedContact.value = {} as Contact;
    showModal.value = true
}

</script>

<template>
    <Button label="Add Contact" @click="handleAdd" />
    <Table 
        :items="contacts" 
        :columns="contactStore.columns"
        @edit="handleUpdateContact"
        @delete="handleDeleteContact" 
    />
    <FormModal
        v-model:modalVisible="showModal" 
        :model="selectedContact"
        title="Add Contact"
        :fields="items"
        @submit="handleAddContact"
    />
</template>