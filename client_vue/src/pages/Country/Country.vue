<script setup lang="ts">    
import FormModal from '@/components/Form/FormModal.vue'
import Table from '@components/Table/Table.vue'
import { useCountry } from '@/composables/pages/useCountry';

const {
  showModal,
  countries,
  selectedCountry,
  tableColumns,
  formFields,
  init,
  handleAdd,
  handleEdit,
  handleDelete,
  handleSubmit
} = useCountry();

</script>

<template>
    <Button label="Add Country" @click="handleAdd" />
    <Table 
        :items="countries" 
        :columns="tableColumns"
        @edit="handleEdit"
        @delete="handleDelete" 
    />
    <FormModal
        v-model:modalVisible="showModal" 
        :model="selectedCountry"
        title="Add Country"
        :fields="formFields"
        @submit="handleSubmit"
    />
</template>