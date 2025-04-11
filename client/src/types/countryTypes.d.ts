interface Country {
    id: number;
    name: string;
    [key: string]: string | number;
}

interface CountryState {
    countries: Country[];
    loading: boolean;
}
type CountryAction = {
    type: string,
    payload: {
        id: number,
        country: Country[]
    }
}