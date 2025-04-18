
import { defineStore } from "pinia";
import {
    fetchPaymonthsApi,
    createPaymonthApi,
    updatePaymonthApi,
    deletePaymonthApi
} from '@/services/paymonth';

import type { Paymonth } from "@/types";

interface PaymonthState {
    paymonths: Paymonth[]
}
const initalState = {
    paymonths: []
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