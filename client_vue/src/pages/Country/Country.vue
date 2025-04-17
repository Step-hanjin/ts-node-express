<script setup lang="ts">
import { ref } from 'vue';
import type { Country,  FormField } from '@/types'         

import FormModal from '@/components/Form/FormModal.vue'
import Table from '@components/Table/Table.vue'
import { useCountryStore } from '@/stores/country';

const countryStore = useCountryStore();

const showModal = ref(false);
const selectedCountry = ref<Partial<Country>>({});

const items: FormField[] = [
  { name: 'name', label: 'Country Name', type: 'text', placeholder: 'Enter country name' },
]

function handleUpdateCountry (country: Country) {
    selectedCountry.value = {...country};
    showModal.value = true;
}

function handleDeleteCountry (country: Country) {
    countryStore.deleteCountry(country.id);
}

function handleAddCountry(newCountry: Country) {
    if(selectedCountry.value?.id) {
        countryStore.updateCountry(newCountry);
    } else {
        countryStore.addCountry(newCountry);
    }
    showModal.value = false;
}

function handleAdd() {
    selectedCountry.value = {}
    showModal.value = true
}

</script>

<template>
    <Button label="Add Country" @click="handleAdd" />
    <Table 
        :items="countryStore.countries" 
        :columns="countryStore.columns"
        @edit="handleUpdateCountry"
        @delete="handleDeleteCountry" 
    />
    <FormModal
        v-model:modalVisible="showModal" 
        :model="selectedCountry"
        title="Add Country"
        :fields="items"
        @submit="handleAddCountry"
    />
</template>