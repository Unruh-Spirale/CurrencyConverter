import type { CurrencyBuySell } from "~/types/currency";
import type { Ref } from "vue";

export const useCurrencyRates = async (currencies: string[] = ["eur", "usd", "chf", "gbp"], days: number = 90) => {
    const currencyData = await Promise.all(
        currencies.map(currency => 
            useFetch<CurrencyBuySell>(`http://api.nbp.pl/api/exchangerates/rates/a/${currency}/last/${days}/?format=json`)
        )
    );

    const result: Record<string, Ref<CurrencyBuySell | null>> = {};
    
    currencies.forEach((currency, index) => {
        result[currency] = currencyData[index].data;
    });

    return result;
};

