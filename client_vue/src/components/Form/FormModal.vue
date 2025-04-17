<script setup lang="ts">
import { ref, watch } from "vue";

import type { FormModalProps } from '@/types'

const props = defineProps<FormModalProps>();
const emit = defineEmits<{
    (e:'update:modalVisible', val: boolean): void;
    (e:'submit', val: any): void;
}>();

const visible = ref(props.modalVisible);
const model = ref<Record<string, any>>({...props.model});

watch(() => props.modalVisible, (val) => {
    visible.value = val;
});

watch(() => props.model, (val) => {
    model.value = {
        ...val
    };
});

function onClose() {
    emit('update:modalVisible', false);
}

function onSubmit() {
    emit('submit', model.value);
    emit('update:modalVisible', false);
}
</script>

<template>
    <Dialog v-model:visible="visible" :header="props.title" :style="{ width: '25rem' }">
        <div 
            v-for="field in fields"
            :key="field.name"
            class="flex items-center gap-4 mb-4"
        >
            <InputText
                v-if="field.type === 'text' || field.type === 'number'" 
                v-model="model[field.name]"
                :type="field.type"
                :placeholder="field.placeholder"
                class="flex-auto" 
                :required="field.required"
            />

            <InputMask
                v-if="field.type === 'month'" 
                v-model="model[field.name]" 
                mask="2025-04"
                :type="field.type"
                :placeholder="field.placeholder"
                class="flex-auto" 
                :required="field.required"
            />

            <InputMask
                v-if="field.type === 'datetime'" 
                v-model="model[field.name]" 
                mask="2025/04/01 12:25 AM"
                :type="field.type"
                :placeholder="field.placeholder"
                class="flex-auto" 
                :required="field.required"
            />

            <InputMask
                v-if="field.type === 'phone'" 
                v-model="model[field.name]" 
                mask="(999) 999-9999? x99999"
                :type="field.type"
                :placeholder="field.placeholder"
                class="flex-auto" 
                :required="field.required"
            />

            <InputMask
                v-if="field.type === 'email'" 
                v-model="model[field.name]" 
                mask="kevin@gmail.com"
                :type="field.type"
                :placeholder="field.placeholder"
                class="flex-auto" 
                :required="field.required"
            />

            <Dropdown
                v-else-if="field.type === 'select'"
                v-model="model[field.name]"
                :options="field.options"
                optionLabel ="label"
                optionValue="value"
                :placeholder="field.placeholder"
                calss="flex-auto"
                :required="field.required"
            />
        </div>

        <div class="flex justify-end gap-2">
            <Button label="Cancel" severity="secondary" @click="onClose" />
            <Button label="Save" @click="onSubmit" />
        </div>
    </Dialog>
</template>
