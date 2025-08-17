<script setup lang="ts">
import type { CurrencyBuySell, Rate } from '~/types/currency';


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
}

const chartData = computed(() => {
  if (currencyPerDays.value?.rates === undefined) return [];
  return currencyPerDays.value?.rates.map(item => ({
      effectiveDate: item.effectiveDate,
      mid: item.mid
  }))
});

const categories: Record<string, BulletLegendItemInterface> = {
  mid: {
    name: props.code.toUpperCase(),
    color: props.color
  }
}

const xFormatter = (i: number) => chartData.value[i]?.effectiveDate;
</script>

<template>
    <div class="pt-10">
        <LineChart
            :data="chartData"
            :categories="categories"
            :height="400"
            :xFormatter="xFormatter"
            :xNumTicks="10"
            xLabel="Date"
            yLabel="Rate"
            :curve-type="CurveType.Linear"
            :legend-position="LegendPosition.Top"
            :xDomainLine=true
            :yDomainLine=true
    :x-tick-line="true"
    :y-tick-line="true"
        />
    </div>
    <div class="flex gap-4 justify-center">
      <UButton label="30 days" :color="colorButton" class="w-32" :ui="{label: 'uppercase mx-auto'}" @click="changeRange(30)" />
      <UButton label="60 days" :color="colorButton" class="w-32" :ui="{label: 'uppercase mx-auto'}" @click="changeRange(60)" />
      <UButton label="90 days" :color="colorButton" class="w-32" :ui="{label: 'uppercase mx-auto'}" @click="changeRange(90)" />
    </div>
</template>