import { defineStore } from "pinia";
import type { Country, TableColumn } from "@/types";

interface CountryState {
    countries: Country[],
    columns: TableColumn[]
}
const initalState = {
    countries: [
        {id:1,name:'Japan'},
        {id:2,name:'Russia'},
        {id:3,name:'China'},
    ],
    columns: [
        {field:'id', header:'ID'},
        {field:'name', header:'name'}
    ]
};

export const useCountryStore = defineStore('country', {
    state: (): CountryState => (initalState),
    actions: {
        addCountry(country: Country) {
            this.countries.push(country);
        },
        updateCountry(country: Country) {
            const index = this.countries.findIndex(item => item.id === country.id);
            if (index != -1) {
                this.countries[index] = country;
            } 
        },
        deleteCountry(id: number) {
            this.countries = this.countries.filter(country => country.id !== id);
        }
    }
});