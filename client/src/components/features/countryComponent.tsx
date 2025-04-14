import React, { useEffect } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";

import { 
    fetchCountries,
    createCountry,
    updateCountry,
    deleteCountry
} from "../../features/countrySlice";
import CustomTable from "../common/CustomTable";

const title = "countries";

const headerData: Column[] = [
    {
        name: 'ID',
        key: 'id',
        type: 'input'
    }, {
        name: 'Name',
        key: 'name',
        type: 'input'
    }
];

const CountryComponent = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const countries = useSelector((state: RootState) => state.country.countries);

    const saveCountry = React.useCallback(
        (country: TableTypes) => dispatch(createCountry(country as Country)),
        [dispatch]
    );

    const editCountry = React.useCallback(
        (country: TableTypes) => dispatch(updateCountry(country as Country)),
        [dispatch]
    );

    const removeCountry = React.useCallback(
        (id: number) => dispatch(deleteCountry(id)),
        [dispatch]
    );

    useEffect(() => {
        dispatch(fetchCountries());
    }, [dispatch]);


    return (
        <CustomTable
            title={title}
            headerItems={headerData}
            tableData={countries}
            saveRow={saveCountry}
            editRow={editCountry}
            deleteRow={removeCountry}
        />
    )
};

export default CountryComponent;