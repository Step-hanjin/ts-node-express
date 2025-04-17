import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { usePaymonthStore } from '@/stores/paymonth';
import type { Paymonth } from '@/types'

export function usePaymonthManager() {
    const paymonthStore = usePaymonthStore();

    const { paymonths } = storeToRefs(paymonthStore);

    onMounted(async () => {
        if (paymonths.value.length === 0) {
            await paymonthStore.getPaymonths();
        }
    });

    async function loadPaymonths() {
        await paymonthStore.getPaymonths();
    }

    async function createOrUpdate (paymonth: Paymonth) {
        if (paymonth.id) {
            await paymonthStore.updatePaymonth(paymonth);
        } else {
            await paymonthStore.addPaymonth(paymonth);
        }
    }

    async function removePaymonth(id: number) {
        await paymonthStore.deletePaymonth(id);
    }

    return {
        paymonths,
        loadPaymonths,
        createOrUpdate,
        removePaymonth
    }
}