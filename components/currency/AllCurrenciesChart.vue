<script setup lang="ts">
    import type { CurrencyBuySell } from "~/types/currency";

    const {data: currencyEur90 } = await useFetch<CurrencyBuySell>("http://api.nbp.pl/api/exchangerates/rates/a/eur/last/90/?format=json");
    const {data: currencyUsd90 } = await useFetch<CurrencyBuySell>("http://api.nbp.pl/api/exchangerates/rates/a/usd/last/90/?format=json");
    const {data: currencyChf90 } = await useFetch<CurrencyBuySell>("http://api.nbp.pl/api/exchangerates/rates/a/chf/last/90/?format=json");
    const {data: currencyGbp90 } = await useFetch<CurrencyBuySell>("http://api.nbp.pl/api/exchangerates/rates/a/gbp/last/90/?format=json");

    type ChartDataItem = {
        effectiveDate: string;
        eur: number;
        usd: number;
        chf: number;
        gbp: number;
    }

    const chartData = computed<ChartDataItem[]>(() => {
        if(currencyEur90 === undefined || currencyUsd90 === undefined || currencyChf90 === undefined || currencyGbp90 === undefined) {
            return [];
        };
        const allDates = new Set<string>();

        currencyEur90.value?.rates.forEach(rate => allDates.add(rate.effectiveDate));
        currencyUsd90.value?.rates.forEach(rate => allDates.add(rate.effectiveDate));
        currencyChf90.value?.rates.forEach(rate => allDates.add(rate.effectiveDate));
        currencyGbp90.value?.rates.forEach(rate => allDates.add(rate.effectiveDate));

        const sortedDates = Array.from(allDates).sort();

        return sortedDates.map(date => {
            const eurRate = currencyEur90.value?.rates.find(r => r.effectiveDate === date)?.mid || 0;
            const usdRate = currencyUsd90.value?.rates.find(r => r.effectiveDate === date)?.mid || 0;
            const chfRate = currencyChf90.value?.rates.find(r => r.effectiveDate === date)?.mid || 0;
            const gbpRate = currencyGbp90.value?.rates.find(r => r.effectiveDate === date)?.mid || 0;
        
            return {
                effectiveDate: date,
                eur: eurRate,
                usd: usdRate,
                chf: chfRate,
                gbp: gbpRate
            };
        });
    });

    const categories: Record<string, BulletLegendItemInterface> ={
        eur: {name: "EUR", color: "#f5a623"},
        usd: {name: "USD", color: "#008000"},
        chf: {name: "CHF", color: "#ff0000"},
        gbp: {name: "GBP", color: "#0000ff"}
    };

    const xFormatter = (i: number): string | number => `${chartData.value[i]?.effectiveDate}`;
</script>

<template>
    <div class="pt-10">
        <LineChart
            :data="chartData"
            :height="300"
            x-label="Date"
            y-label="Rate"
            :x-num-ticks="10"
            :categories="categories"
            :x-formatter="xFormatter"
            :curve-type="CurveType.MonotoneX"
            :legend-position="LegendPosition.Top"
            :hide-legend="false"
            :x-domain-line="true"
            :y-domain-line="true"
            :x-tick-line="true"
            :y-tick-line="true"
        />
    </div> 
</template>