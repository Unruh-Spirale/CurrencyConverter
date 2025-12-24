<script setup lang="ts">
    import type { CurrencyBuySell} from "~/types/currency";

    const props = defineProps<{
        code: string;
        color: string;
        colorButton: string;
    }>();

    const range = ref<number>(30);
    const uri = computed(() => `http://api.nbp.pl/api/exchangerates/rates/a/${props.code}/last/${range.value}/?format=json`);

    const {data: currencyPerDays, refresh } = await useFetch<CurrencyBuySell>(()=>uri.value);

    const changeRange = async (newRange: number): Promise<void> => {
        range.value = newRange;
        await refresh();
    };

    const chartData = computed(() => {
        if (currencyPerDays.value?.rates === undefined) return [];
        return currencyPerDays.value?.rates.map(item => ({
            effectiveDate: item.effectiveDate,
            mid: item.mid
        }));
    });

    const categories: Record<string, BulletLegendItemInterface> = {
        mid: {
            name: props.code.toUpperCase(),
            color: props.color
        }
    };
 
    // xFormatter: otrzymuje INDEKS (i) - pozycję w tablicy danych
    // Używamy go do pobrania daty z chartData[i]
    // const xFormatter = (i: number) => chartData.value[i]?.effectiveDate || "";
    const xFormatter = (tick: number): string => {
        return chartData.value[tick]?.effectiveDate ?? "";
    };
    
    // yFormatter: otrzymuje WARTOŚĆ TICKA z osi Y (już jest to wartość z chartData.mid)
    // Formatujemy wartość liczbową do wyświetlenia na osi Y
    const yFormatter = (tick: number): string => {
        return tick.toFixed(2);
    };

    const xAxisConfig = {
        tickTextAlign: "right" as const,
        tickTextAngle: -45
    };

    // Konfiguracja osi Y
    const yAxisConfig = {
        tickTextAlign: "center" as const,
        tickFormat: yFormatter,  // Używamy yFormatter do formatowania ticków na osi Y
        // Tutaj możesz dodać właściwości z AxisConfig
        // np. tickTextFontSize: "12px",
        // tickTextColor: "#666",
        // itd.
    };

    // Uproszczona domena osi Y - biblioteka powinna automatycznie wykrywać wartości,
    // ale jeśli nie działa, możemy ustawić min/max ręcznie
    const yDomain = computed<[number | undefined, number | undefined]>(() => {
        const midValues = chartData.value
            .map(item => item.mid)
            .filter((mid): mid is number => mid !== undefined && mid !== null);
        
        if (midValues.length === 0) return [undefined, undefined];
        
        const min = Math.min(...midValues);
        const max = Math.max(...midValues);
        
        return [min, max];
    });
</script>

<template>
    <div class="px-10">
        <div class="flex gap-4 justify-center">
            <UButton label="30 days" :color="colorButton" class="w-32" :ui="{label: 'uppercase mx-auto'}" @click="changeRange(30)" />
            <UButton label="60 days" :color="colorButton" class="w-32" :ui="{label: 'uppercase mx-auto'}" @click="changeRange(60)" />
            <UButton label="90 days" :color="colorButton" class="w-32" :ui="{label: 'uppercase mx-auto'}" @click="changeRange(90)" />
        </div>
        <div class="py-3">
            <LineChart
                :data="chartData"
                :height="400"
                xLabel="Date"
                yLabel="Rate"
                :categories="categories"
                :xFormatter="xFormatter"
                :yFormatter="yFormatter"
                :curve-type="CurveType.Linear"
                :xNumTicks="10"
                :legend-position="LegendPosition.TopCenter"
                :xDomainLine=true
                :yDomainLine=true
                :xTickLine="true"
                :yTickLine="true"
                :yGridLine="true"
                :xAxisConfig="xAxisConfig"
                :yAxisConfig="yAxisConfig"
                :yDomain="yDomain"
            />
        </div>
    </div>
</template>