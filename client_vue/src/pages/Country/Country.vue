<script setup lang="ts">    
import FormModal from '@/components/Form/FormModal.vue'
import Table from '@components/Table/Table.vue'

import { useLayout } from '@/composables/pages/useLayout'
import { useCountry } from '@/composables/pages/useCountry';
import { onMounted } from 'vue';

const { setActiveMenuItem } = useLayout();
setActiveMenuItem("Countries");

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

onMounted(init);
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