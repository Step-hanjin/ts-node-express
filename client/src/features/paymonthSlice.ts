import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as api from '../services/paymonthApi';

const initialState: PaymonthState = {
    paymonths: [],
    loading: false
}

export const fetchPaymonths = createAsyncThunk(
    'paymonths/fetchPaymonths', 
    async () => {
        return await api.fetchPaymonths();
    }
);

export const createPaymonth = createAsyncThunk(
    'paymonths/createPaymonth', 
    async (paymonth: Paymonth) => {
        const res = await api.createPaymonth(paymonth);
        return res;
    }
);

export const updatePaymonth = createAsyncThunk(
    'paymonths/updatePaymonth', 
    async (paymonth: Paymonth) => {
        await api.updatePaymonth(paymonth);
        return paymonth;
    }
);

export const deletePaymonth = createAsyncThunk(
    'paymonths/deletePaymonth', 
    async (id: number) => {
        await api.deletePaymonth(id);
        return id;
    }
);

const paymonthSlice = createSlice({
    name: 'paymonth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaymonths.fulfilled, (state, action) => {
                state.paymonths = action.payload;                
            })
            .addCase(createPaymonth.fulfilled, (state, action) => {
                state.paymonths.push(action.payload);
            })
            .addCase(updatePaymonth.fulfilled, (state, action) => {
                const index = state.paymonths.findIndex(paymonth => paymonth.id === action.payload.id);
                if (index !== -1) {
                    state.paymonths[index] = action.payload;
                }
            })
            .addCase(deletePaymonth.fulfilled, (state, action) => {
                state.paymonths = state.paymonths.filter(paymonth => paymonth.id !== action.payload);
            })
            ;            
    },
});

export default paymonthSlice.reducer;