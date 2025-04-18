export interface TableColumn {
    field: string,
    header: string
}

export interface TableProps<T> {
    items: T[]
    columns: TableColumn[]
}