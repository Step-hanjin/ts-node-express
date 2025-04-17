<script setup lang="ts" generic="T">
import type { TableProps } from '@/types';

const props = defineProps<TableProps<T>>()
const emit = defineEmits<{
    (e: 'edit', item: any): void;
    (e: 'delete', item: any): void;
}>();

const onEdit = (item: T) => {
    emit('edit', item);
}

const onDelete = (item: T) => {
    emit('delete', item);
}
</script>

<template>
    <div>
        <DataTable 
            class="w-full"
            showGridlines 
            :value="props.items"  
        >
            <Column
                v-for="col in props.columns"
                :key="col.field"
                :field="col.field"
                :header="col.header"
            />

            <!-- Action buttons slot per row -->
            <Column header="Actions">
                <template #body="{ data }">
                    <Button 
                        label="Edit" 
                        severity="contrast" 
                        variant="text" 
                        @click="onEdit(data)" 
                    />
                    |
                    <Button 
                        label="Delete" 
                        severity="danger" 
                        variant="text" 
                        @click="onDelete(data)" 
                    />
                </template>
            </Column>
        </DataTable>
    </div>
</template>