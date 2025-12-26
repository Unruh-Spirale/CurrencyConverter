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

    const xFormatter = (tick: number): string => {
        return chartData.value[tick]?.effectiveDate;
    };
    const xAxisConfig = {
        tickTextAlign: "right" as const,
        tickTextAngle: -45
    };
    const yDomain = computed<[number | undefined, number | undefined]>(() => {
        const values: number[] = chartData.value
            .flatMap(item => [item.eur, item.usd, item.chf, item.gbp])
            .filter((value): value is number => value !== undefined && value !== null && value !== 0);
        
        if (values.length === 0) return [undefined, undefined];
        
        const min = Math.min(...values);
        const max = Math.max(...values);
        
        return [min, max];
    });
</script>

<template>
    <LineChart
        :data="chartData"
        :height="450"
        x-label="Date"
        y-label="Rate"
        :x-num-ticks="10"
        :categories="categories"
        :xFormatter="xFormatter"
        :curve-type="CurveType.MonotoneX"
        :legend-position="LegendPosition.TopCenter"
        :hide-legend="false"
        :x-domain-line="true"
        :y-domain-line="true"
        :x-tick-line="true"
        :y-tick-line="true"
        :y-grid-line="true"
        :xAxisConfig="xAxisConfig"
        :yDomain="yDomain"
    />
</template>