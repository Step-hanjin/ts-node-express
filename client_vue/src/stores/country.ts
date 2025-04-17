import { defineStore } from "pinia";
import {
    fetchCountriesApi,
    createCountryApi,
    updateCountryApi,
    deleteCountryApi
} from '@/services/country';

import type { Country, TableColumn } from "@/types";

interface CountryState {
    countries: Country[],
    columns: TableColumn[]
}
const initalState = {
    countries: [],
    columns: [
        {field:'id', header:'ID'},
        {field:'name', header:'name'}
    ]
};

export const useCountryStore = defineStore('country', {
    state: (): CountryState => (initalState),
    actions: {
        async getCountries() {
            const response = await fetchCountriesApi();
            this.countries= response;
        },
        async addCountry(country: Country) {
            await createCountryApi(country);
            this.getCountries();
        },
        async updateCountry(country: Country) {
            await updateCountryApi(country);
            this.getCountries();
        },
        async deleteCountry(id: number) {
            await deleteCountryApi(id);
            this.getCountries();
        }
    }
});