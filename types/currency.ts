export interface CurrencyBuySell {
    table: string;
    currency: string;
    code: string;
    rates: Rate[]
}

export interface Rate {
    no: string;
    effectiveDate: string;
    bid?: number;
    ask?: number;
    mid?: number;
}