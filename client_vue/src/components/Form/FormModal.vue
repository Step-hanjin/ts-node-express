<script setup lang="ts">
import { ref, watch } from 'vue'
import { getCurrentDate } from '@/utils/date'
import type { FormModalProps, FormField } from '@/types'
// import { getNestedValue } from '@/utils/object';
import { Form } from '@primevue/forms';

const props = defineProps<FormModalProps>()
const emit = defineEmits<{
  (e: 'update:modalVisible', val: boolean): void
  (e: 'submit', val: any): void
}>()

const visible = ref(props.modalVisible)
const model = ref<Record<string, any>>({ ...props.model })

watch(
  () => props.modalVisible,
  (val) => {
    visible.value = val
  }
)

watch(
  () => props.model,
  (newModel) => {
    model.value = {...newModel} 
    props.fields.forEach((field: FormField) => {
      const defaultValue = newModel?.[field.name] ?? getDefaultValue(field.type);
      model.value[field.name] = defaultValue
    })
  },
  { immediate: true }
)

function getDefaultValue(type: string): any {
  switch (type) {
    case 'month':
      return getCurrentDate('YYYY-MM')
    case 'datetime':
      return getCurrentDate('YYYY/MM/DD hh:mm A')
    case 'select':
      return {}
    // case 'email':
    //   return 'example@email.com'
    default:
      return ''
  }
}

function onClose() {
  emit('update:modalVisible', false)
}

function onSubmit() {
  emit('submit', model.value)
  emit('update:modalVisible', false)
}
</script>

<template>
  <Dialog v-model:visible="visible" :header="props.title" :style="{ width: '25rem' }">
      <div v-for="field in props.fields" :key="field.name" class="flex items-center gap-4 mb-4">
        <InputText
          v-if="['text', 'number'].includes(field.type)"
          v-model="model[field.name]"
          :type="field.type"
          :placeholder="field.placeholder"
          class="flex-auto"
          :required="field.required"
        />

        <InputMask
          v-else-if="field.type === 'month'"
          v-model="model[field.name]"
          mask="9999-99"
          :placeholder="field.placeholder"
          class="flex-auto"
          :required="field.required"
        />

        <InputMask
          v-else-if="field.type === 'datetime'"
          v-model="model[field.name]"
          mask="9999/99/99 99:99 **"
          placeholder="YYYY/MM/DD hh:mm AM/PM"
          class="flex-auto"
          :required="field.required"
        />

        <Calendar
          v-else-if="field.type === 'datepicker'"
          v-model="model[field.name]"
          :showTime="true"
          :hourFormat="'12'"
          dateFormat="yy/mm/dd"
          placeholder="YYYY/MM/DD hh:mm AM/PM"
          class="flex-auto"
          :required="field.required"
        />

        <InputMask
          v-else-if="field.type === 'phone'"
          v-model="model[field.name]"
          mask="(999) 999-9999? x99999"
          placeholder="(999) 999-9999? x99999"
          class="flex-auto"
          :required="field.required"
        />

        <InputText
          v-else-if="field.type === 'email'"
          v-model="model[field.name]"
          type="email"
          :placeholder="field.placeholder"
          class="flex-auto"
          :required="field.required"
        />

        <Select
          v-else-if="field.type === 'select'"
          v-model="model[field.name]['id']"
          :options="field.options"
          optionLabel="label"
          optionValue="value"
          :placeholder="field.placeholder"
          class="flex-auto"
          :required="field.required"
        />
      </div>    
      <div class="flex justify-end gap-2">
        <Button label="Cancel" severity="secondary" @click="onClose" />
        <Button label="Save" @click="onSubmit" />
      </div>
  </Dialog>
</template>
