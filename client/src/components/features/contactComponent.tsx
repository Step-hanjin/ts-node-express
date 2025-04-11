import React, { useEffect, useState } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";

import { 
    fetchContacts,
    createContact,
    updateContact,
    deleteContact
} from "../../features/contactSlice";
import {
    fetchCountries
} from "../../features/countrySlice";

import CustomTable from "../common/CustomTable";

const title = "contact";

const ContactComponent = () => {
    const dispatch: Dispatch<any> = useDispatch();

    const contacts = useSelector((state: RootState) => {
        return state.contact.contacts
    });
    
    const countries = useSelector((state: RootState) => {
        return state.country.countries
    });

    const contactHeaders: Column[] = [
        {
            name: 'ID',
            key: 'id',
        }, {
            name: 'Name',
            key: 'name',
        },{
            name: 'Country',
            key: 'country_name',
        },
        {
            name: 'Email',
            key: 'email',
        }, {
            name: 'Phone',
            key: 'phone',
        }, {
            name: 'Note',
            key: 'note',
        }
    ];

    const contactFormItems: Column[] = [
        {
            name: 'ID',
            key: 'id',
            type: ''
        }, {
            name: 'Name',
            key: 'name',
            type: 'input'
        },{
            name: 'Country',
            key: 'country',
            type: {
                name: 'selector',
                items: countries
            }
        },
        {
            name: 'Email',
            key: 'email',
            type: 'input'
        }, {
            name: 'Phone',
            key: 'phone',
            type: 'input'
        }, {
            name: 'Note',
            key: 'note',
            type: 'input'
        }
    ];
    const saveContact = React.useCallback(
        (contact: TableTypes) => dispatch(createContact(contact as Contact)),
        [dispatch]
    );

    const editContact = React.useCallback(
        (contact: TableTypes) => dispatch(updateContact(contact as Contact)),
        [dispatch]
    );

    const removeContact = React.useCallback(
        (id: number) => dispatch(deleteContact(id)),
        [dispatch]
    );

    useEffect(() => {
        dispatch(fetchContacts());
        dispatch(fetchCountries());
    }, [dispatch]);

    return (
        <CustomTable
            title={title}
            headerItems={contactHeaders}
            formItems={contactFormItems}
            tableData={contacts}
            saveRow={saveContact}
            editRow={editContact}
            deleteRow={removeContact}
        />
    )
};

export default ContactComponent;