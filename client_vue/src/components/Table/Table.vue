<script setup lang="ts" generic="T">
import type { TableProps } from '@/types';

const props = defineProps<TableProps<T>>()
</script>

<template>
    <div>
        <DataTable :value="props.items" class="w-full">
            <Column
                v-for="col in props.columns"
                :key="col.field"
                :field="col.field"
                :header="col.header"
            />
        </DataTable>
    </div>
</template>