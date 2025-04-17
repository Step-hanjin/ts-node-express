
import { defineStore } from "pinia";
import {
    fetchPaymonthsApi,
    createPaymonthApi,
    updatePaymonthApi,
    deletePaymonthApi
} from '@/services/paymonth';

import type { Paymonth, TableColumn } from "@/types";

interface PaymonthState {
    paymonths: Paymonth[],
    columns: TableColumn[]
}
const initalState = {
    paymonths: [],
    columns: [
        {field:'id', header:'ID'},
        {field:'month', header:'Month'},
        {field:'start_time', header:'Start_time'},
        {field:'end_time', header:'End_time'}
    ]
};

export const usePaymonthStore = defineStore('paymonth', {
    state: (): PaymonthState => (initalState),
    actions: {
        async getPaymonths() {
            const response = await fetchPaymonthsApi();
            this.paymonths= response;
        },
        async addPaymonth(paymonth: Paymonth) {
            await createPaymonthApi(paymonth);
            this.getPaymonths();
        },
        async updatePaymonth(paymonth: Paymonth) {
            await updatePaymonthApi(paymonth);
            this.getPaymonths();
        },
        async deletePaymonth(id: number) {
            await deletePaymonthApi(id);
            this.getPaymonths();
        }
    }
});