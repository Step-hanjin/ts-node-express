import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as api from '../services/contactApi';

const initialState: ContactState = {
    contacts: [],
    loading: false
}

export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts', 
    async () => {
        return await api.fetchContacts();
    }
);

export const createContact = createAsyncThunk(
    'contacts/createContact', 
    async (contact: Contact) => {
        const res = await api.createContact(contact);
        return res;
    }
);

export const updateContact = createAsyncThunk(
    'contacts/updateContact', 
    async (contact: Contact) => {
        const res = await api.updateContact(contact);
        return res;
    }
);

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact', 
    async (id: number) => {
        await api.deleteContact(id);
        return id;
    }
);

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;                
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.contacts = action.payload;                
                state.loading = false;                
            })
            .addCase(createContact.pending, (state) => {
                state.loading = false;                
            })
            .addCase(createContact.fulfilled, (state, action) => {
                state.contacts.push(action.payload);
                state.loading = false;                
            })
            .addCase(updateContact.pending, (state) => {
                state.loading = true;                
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
                if (index !== -1) {
                    state.contacts[index] = action.payload;
                }
                state.loading = false;                
            })
            .addCase(deleteContact.pending, (state) => {
                state.loading = true;                
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
                state.loading = false;                
            })
            ;            
    },
});

export default contactSlice.reducer;