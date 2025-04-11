import { combineReducers } from "redux";
import countryReducer from "../features/countrySlice";
import paymonthReducer from "../features/paymonthSlice";
import contactReducer from "../features/contactSlice";

const rootReducer = combineReducers({
    country: countryReducer,
    paymonth: paymonthReducer,
    contact: contactReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;