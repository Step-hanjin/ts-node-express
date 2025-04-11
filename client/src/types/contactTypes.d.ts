
interface Contact {
    id: number;
    name: string;
    email: string; 
    phone: string; 
    note: string; 
    country: number;
    [key: string]: string | number ; // Allows additional properties
}
interface ContactState {
    contacts: Contact[];
    loading: boolean;
}
type ContactAction = {
    type: string,
    payload: {
        id: number,
        contact: Contact[]
    }
}