import { defineStore } from "pinia";
import {
    fetchCountriesApi,
    createCountryApi,
    updateCountryApi,
    deleteCountryApi
} from '@/services/country';

import type { Country } from "@/types";

interface CountryState {
    countries: Country[],
}
const initialState = {
    countries: []
};

/**
 * Country Store (Pinia)
 * Manages state and CRUD operations for country entities using API services.
 * 
 * Actions:
 * - Fetch all countries
 * - Add a new country
 * - Update a country
 * - Delete a country
 */
export const useCountryStore = defineStore('country', {
    state: (): CountryState => (initialState),
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