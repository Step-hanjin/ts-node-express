<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import type { Paymonth,  FormField } from '@/types'         

import FormModal from '@/components/Form/FormModal.vue'
import Table from '@components/Table/Table.vue'
import { usePaymonthStore } from '@/stores/paymonth';

const paymonthStore = usePaymonthStore();

const showModal = ref(false);
const selectedPaymonth = ref<Partial<Paymonth>>({});
const paymonths = computed(() => {
   return paymonthStore.paymonths;
});

const items: FormField[] = [
  { name: 'month', label: 'Month', type: 'month', placeholder: 'Enter payment month' },
  { name: 'start_time', label: 'Start_time', type: 'datetime', placeholder: 'Enter start_time' },
  { name: 'end_time', label: 'End_time', type: 'datetime', placeholder: 'Enter end_time' },
]

onBeforeMount(() => {
    paymonthStore.getPaymonths();
});

function handleUpdatePaymonth (paymonth: Paymonth) {
    selectedPaymonth.value = {...paymonth};
    showModal.value = true;
}

function handleDeletePaymonth (paymonth: Paymonth) {
    paymonthStore.deletePaymonth(paymonth.id);
}

function handleAddPaymonth(newPaymonth: Paymonth) {
    if(selectedPaymonth.value?.id) {
        paymonthStore.updatePaymonth(newPaymonth);
    } else {
        paymonthStore.addPaymonth(newPaymonth);
    }
    showModal.value = false;
}

function handleAdd() {
    selectedPaymonth.value = {}
    showModal.value = true
}

</script>

<template>
    <Button label="Add Paymonth" @click="handleAdd" />
    <Table 
        :items="paymonths" 
        :columns="paymonthStore.columns"
        @edit="handleUpdatePaymonth"
        @delete="handleDeletePaymonth" 
    />
    <FormModal
        v-model:modalVisible="showModal" 
        :model="selectedPaymonth"
        title="Add Paymonth"
        :fields="items"
        @submit="handleAddPaymonth"
    />
</template>