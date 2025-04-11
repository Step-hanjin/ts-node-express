import React, { useEffect } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";

import { 
    fetchPaymonths,
    createPaymonth,
    updatePaymonth,
    deletePaymonth
} from "../../features/paymonthSlice";
import CustomTable from "../common/CustomTable";

const title = "paymonth";

const headerData: Column[] = [
    {
        name: 'ID',
        key: 'id',
        type: 'input'
    }, {
        name: 'Month',
        key: 'month',
        type: 'month'
    },{
        name: 'Start time',
        key: 'start_time',
        type: 'datetime'
    },{
        name: 'End time',
        key: 'end_time',
        type: 'datetime'
    }
];

const PaymonthComponent = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const paymonths = useSelector((state: RootState) => {
        return state.paymonth.paymonths
    });

    const savePaymonth = React.useCallback(
        (paymonth: TableTypes) => dispatch(createPaymonth(paymonth as Paymonth)),
        [dispatch]
    );

    const editPaymonth = React.useCallback(
        (paymonth: TableTypes) => dispatch(updatePaymonth(paymonth as Paymonth)),
        [dispatch]
    );

    const removePaymonth = React.useCallback(
        (id: number) => dispatch(deletePaymonth(id)),
        [dispatch]
    );

    useEffect(() => {
        dispatch(fetchPaymonths());
    }, [dispatch]);


    return (
        <CustomTable
            title={title}
            headerItems={headerData}
            tableData={paymonths}
            saveRow={savePaymonth}
            editRow={editPaymonth}
            deleteRow={removePaymonth}
        />
    )
};

export default PaymonthComponent;