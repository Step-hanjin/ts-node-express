interface Paymonth {
    id: number;
    month: string;
    start_time: string;
    end_time: string;
    [key: string]: string | number;
}

interface PaymonthState {
    paymonths: Paymonth[];
    loading: boolean;
}
type PaymonthAction = {
    type: string,
    payload: {
        id: number,
        paymonth: Paymonth[]
    }
}