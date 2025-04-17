import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCountryStore } from '@/stores/country';
import type { Country } from '@/types'

export function useCountryManager() {
    const countryStore = useCountryStore();

    const { countries } = storeToRefs(countryStore);

    onMounted(async () => {
        if (countries.value.length === 0) {
            await countryStore.getCountries();
        }
    });

    async function loadCountries() {
        await countryStore.getCountries();
    }

    async function createOrUpdate (country: Country) {
        if (country.id) {
            await countryStore.updateCountry(country);
        } else {
            await countryStore.addCountry(country);
        }
    }

    async function removeCountry(id: number) {
        await countryStore.deleteCountry(id);
    }

    return {
        countries,
        loadCountries,
        createOrUpdate,
        removeCountry
    }
}