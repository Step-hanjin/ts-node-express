<script setup lang="ts">
import FormModal from '@/components/Form/FormModal.vue'
import Table from '@components/Table/Table.vue'
import { usePaymonth } from '@/composables/pages/usePaymonth';

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