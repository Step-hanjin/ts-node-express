// begin: declare basic types
    type selectorItemType = {
        id : number,
        name : string,
        [key: string]: string | number
    }
    type FormItemTypes = 
        'input' |
        'month' |
        'datetime' |
        {
            name: 'selector',
            items: selectorItemType[]
        } |
        ''
    ;
    interface Column {
        name : string;
        key : string;
        type?: FormItemTypes
    }

    interface Row {
        id: number,
        [key: string] : string | number;
    }
// end: delcare basic types


type TableTypes = Paymonth | Country | Contact;

type sidebarItemListType = {
    name: string,
    url: string
}[];