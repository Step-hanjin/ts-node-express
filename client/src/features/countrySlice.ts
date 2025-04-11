import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as api from '../services/countryApi';

const initialState: CountryState = {
    countries: [],
    loading: false
}

export const fetchCountries = createAsyncThunk(
    'countries/fetchCountries', 
    async () => {
        return await api.fetchCountries();
    }
);

export const createCountry = createAsyncThunk(
    'countries/createCountry', 
    async (country: Country) => {
        return await api.createCountry(country);
    }
);

export const updateCountry = createAsyncThunk(
    'countries/updateCountry', 
    async (country: Country) => {
        return await api.updateCountry(country);
    }
);

export const deleteCountry = createAsyncThunk(
    'countries/deleteCountry', 
    async (id: number) => {
        await api.deleteCountry(id);
        return id;
    }
);

const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.countries = action.payload;                
            })
            .addCase(createCountry.fulfilled, (state, action) => {
                state.countries.push(action.payload);
            })
            .addCase(updateCountry.fulfilled, (state, action) => {
                const index = state.countries.findIndex(country => country.id === action.payload.id);
                if (index !== -1) {
                    state.countries[index] = action.payload;
                }
            })
            .addCase(deleteCountry.fulfilled, (state, action) => {
                state.countries = state.countries.filter(country => country.id !== action.payload);
            })
            ;            
    },
});

export default countrySlice.reducer;