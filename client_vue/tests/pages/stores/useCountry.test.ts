import { setActivePinia, createPinia } from 'pinia' 
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useCountryStore } from '@/stores/country'
import * as countryService from '@/services/country'

describe('useCountryStore', () => {
    const mockCountries = [
        {id: 1,name:'Russia'},
        {id: 2,name:'China'},
    ];

    const mockCountry = { id: 3, name: 'Spanish' };

    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('getCountries: fetch countries and update stores', async () => {
        vi.spyOn(countryService, 'fetchCountriesApi').mockResolvedValue(mockCountries);

        const store = useCountryStore();
        await store.getCountries();

        expect(store.countries).toEqual(mockCountries);
    });

    it('addCountry: call createCountryApi and refreshes countries', async () => {
        const getSpy = vi.spyOn(countryService, 'fetchCountriesApi').mockResolvedValue(mockCountries);
        const createSpy = vi.spyOn(countryService, 'createCountryApi').mockResolvedValue(undefined);

        const store = useCountryStore();
        await store.addCountry(mockCountry);

        expect(createSpy).toHaveBeenCalledWith(mockCountry);
        expect(getSpy).toHaveBeenCalled();
    });

    it('updateCountry: updates country and refreshs countries', async () => {
        const getSpy = vi.spyOn(countryService, 'fetchCountriesApi').mockResolvedValue(mockCountries);
        const updateSpy = vi.spyOn(countryService, 'updateCountryApi').mockResolvedValue(undefined);
        
        const store = useCountryStore();
        await store.updateCountry(mockCountry);

        expect(updateSpy).toHaveBeenCalledWith(mockCountry);
        expect(getSpy).toHaveBeenCalled();
    });

    it('deleteCountry: call deleteCountry api and refreshs countries', async () => {
        const getSpy = vi.spyOn(countryService, 'fetchCountriesApi').mockResolvedValue(mockCountries);
        const deleteSpy = vi.spyOn(countryService, 'deleteCountryApi').mockResolvedValue(undefined);

        const store = useCountryStore();
        await store.deleteCountry(1);

        expect(deleteSpy).toHaveBeenCalledWith(1);
        expect(getSpy).toHaveBeenCalled();
    });
});