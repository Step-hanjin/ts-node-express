import { useCountryManager } from '@/composables/stores/useCountryManager'

import type { TableColumn, Country, FormField } from '@/types'
import { ref, computed } from 'vue'

export function useCountry() {
    const {
        countries: storeCountries,
        loadCountries,
        createOrUpdate,
        removeCountry
    } = useCountryManager();
    const showModal = ref(false)
    const selectedCountry = ref<Partial<Country>>({});

    const countries = computed(() => storeCountries.value)

    const formFields = computed<FormField[]>(() => [  
        { name: 'name', label: 'Country Name', type: 'text', placeholder: 'Enter country name' },
    ])

    const tableColumns = computed<TableColumn[]>(() => [
        {field:'id', header:'ID'},
        {field:'name', header:'name'}
    ])

    async function init() {
        await loadCountries();
    }
    function handleAdd() {
        selectedCountry.value = {}
        showModal.value = true;
    }

    function handleEdit(country: Country) {
        selectedCountry.value = { ...country }
        showModal.value = true;
    }

    function handleDelete(country: Country) {
        removeCountry(country.id);
    }

    function handleSubmit(country: Country) {
        createOrUpdate(country);
    }

    return {
        showModal,
        countries,
        selectedCountry,
        tableColumns,
        formFields,
        handleAdd,
        handleEdit,
        handleDelete,
        handleSubmit,
    }
}