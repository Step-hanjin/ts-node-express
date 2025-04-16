export type FormFieldType = 'text' | 'number' | 'select' | 'month' | 'datetime'

export interface FormSelectOption {
    label: string;
    value: string | number
}

export interface FormField {
    name: string,
    label: string,
    type: FormFieldType,
    required?: boolean,
    options?: FormSelectOption[],
    placeholder?: string
}

export interface FormModalProps {
    modalVisible: boolean,
    title: string,
    model: Record<string, any>,
    fields: FormField[]
}