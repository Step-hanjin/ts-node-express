import { usePaymonthManager } from '@/composables/stores/usePaymonthManger'

import type { TableColumn, Paymonth, FormField } from '@/types'
import { ref, computed } from 'vue'

export function usePaymonth() {
    const {
        paymonths: storePaymonths,
        createOrUpdate,
        loadPaymonths,
        removePaymonth
    } = usePaymonthManager();
    const showModal = ref(false)
    const selectedPaymonth = ref<Partial<Paymonth>>({});

    const paymonths = computed(() => storePaymonths.value)

    const formFields = computed<FormField[]>(() => [
        { name: 'month', label: 'Month', type: 'month', placeholder: 'Enter payment month' },
        { name: 'start_time', label: 'Start_time', type: 'datetime', placeholder: 'Enter start_time' },
        { name: 'end_time', label: 'End_time', type: 'datetime', placeholder: 'Enter end_time' },
    ])

    const tableColumns = computed<TableColumn[]>(() => [
        {field:'id', header:'ID'},
        {field:'month', header:'Month'},
        {field:'start_time', header:'Start_time'},
        {field:'end_time', header:'End_time'}
    ])

    async function init() {
        await loadPaymonths();
    }

    function handleAdd() {
        selectedPaymonth.value = {}
        showModal.value = true;
    }

    function handleEdit(paymonth: Paymonth) {
        selectedPaymonth.value = { ...paymonth }
        showModal.value = true;
    }

    function handleDelete(paymonth: Paymonth) {
        removePaymonth(paymonth.id);
    }

    function handleSubmit(paymonth: Paymonth) {
        createOrUpdate(paymonth);
    }

    return {
        showModal,
        paymonths,
        selectedPaymonth,
        tableColumns,
        formFields,
        init,
        handleAdd,
        handleEdit,
        handleDelete,
        handleSubmit,
    }
}