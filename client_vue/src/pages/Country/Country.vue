<script setup lang="ts">
import Table from '@components/Table/Table.vue'
import type { TableColumn, Country } from '@/types'

const countries: Country[] = [
    {id:1,name:'Japan'},
    {id:2,name:'Russia'},
    {id:3,name:'China'},
];

const columns: TableColumn[] = [
    {field:'id', header:'ID'},
    {field:'name', header:'name'}
];

</script>

<template>
    <Table :items="countries" :columns="columns" />
</template>