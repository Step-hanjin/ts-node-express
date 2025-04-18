export interface Contact {
    id: number;
    name: string;
    email: string; 
    phone: string; 
    note: string; 
    country: {
        id: number;
        name: string;
    };
}


