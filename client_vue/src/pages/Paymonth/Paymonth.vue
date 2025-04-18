<script setup lang="ts">
import { onMounted } from 'vue';
import FormModal from '@/components/Form/FormModal.vue'
import Table from '@components/Table/Table.vue'

import { useLayout } from '@/composables/pages/useLayout'
import { usePaymonth } from '@/composables/pages/usePaymonth';

const { setActiveMenuItem } = useLayout();

const {
  showModal,
  paymonths,
  selectedPaymonth,
  tableColumns,
  formFields,
  init,
  handleAdd,
  handleEdit,
  handleDelete,
  handleSubmit
} = usePaymonth();

onMounted(()=> {
    init
});
</script>

<template>
    <Button label="Add Paymonth" @click="handleAdd" />
    <Table 
        :items="paymonths" 
        :columns="tableColumns"
        @edit="handleEdit"
        @delete="handleDelete" 
    />
    <FormModal
        v-model:modalVisible="showModal" 
        :model="selectedPaymonth"
        title="Add Paymonth"
        :fields="formFields"
        @submit="handleSubmit"
    />
</template>