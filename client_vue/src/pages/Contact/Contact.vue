<script setup lang="ts">
import { onMounted } from 'vue';
import type { Contact } from '@/types'         
import FormModal from '@/components/Form/FormModal.vue'
import Table from '@components/Table/Table.vue'
import { useContact } from '@/composables/pages/useContact'

const {
  showModal,
  contacts,
  selectedContact,
  tableColumns,
  formFields,
  init,
  handleAdd,
  handleEdit,
  handleDelete,
  handleSubmit
} = useContact();
onMounted(init);
</script>

<template>
    <Button label="Add Contact" @click="handleAdd" />
    <Table 
        :items="contacts" 
        :columns="tableColumns"
        @edit="handleEdit"
        @delete="handleDelete" 
    />
    <FormModal
        v-model:modalVisible="showModal" 
        :model="selectedContact"
        title="Add Contact"
        :fields="formFields"
        @submit="handleSubmit"
    />
</template>