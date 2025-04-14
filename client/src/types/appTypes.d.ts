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

    interface JoinObject {
        id: number,
        name: string,
        [key: string]: string | number
    }

    interface Row {
        id: number,
        [key: string] : string | number | JoinObject;
    }
// end: delcare basic types


type TableTypes = Paymonth | Country | Contact;

type sidebarItemListType = {
    name: string,
    url: string
}[];