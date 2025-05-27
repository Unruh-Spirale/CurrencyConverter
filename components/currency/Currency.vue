<script setup lang="ts">
    import type { CurrencyBuySell } from '~/types/currency'

    const props = defineProps<{
        code: string;
        icon: string;
    }>();

    const pln: string = "PLN";
    const uriCurrency: string = `http://api.nbp.pl/api/exchangerates/rates/c/${props.code}/?format=json`;
    const uriCurrencyMid: string = `https://api.nbp.pl/api/exchangerates/rates/a/${props.code}/`

        const {data: currency} = await useFetch<CurrencyBuySell>(uriCurrency)
        const {data: currencyMid} = await useFetch<CurrencyBuySell>(uriCurrencyMid)

    const data = ref([
        {
            buy: currency.value?.rates[0].ask,
            sell: currency.value?.rates[0].bid,
            average: currencyMid.value?.rates[0].mid
        }
    ])
</script>

<template>
    <div>
        <div class="flex items-center gap-2">
            <div class="grid gap-2">
                <UButtonGroup>
                    <UBadge color="neutral" variant="outline" size="lg" :label="code" :ui="{base: 'border-1', label: 'uppercase'}"/>
                    <UInput color="neutral" variant="outline"/>
                </UButtonGroup>
                <UButtonGroup>
                    <UBadge color="neutral" variant="outline" size="lg" :label="pln" :ui="{base: 'border-1'}"/>
                    <UInput color="neutral" variant="outline" />
                </UButtonGroup>
            </div>
            <UIcon :name="icon" class="size-17 flex-none"/>
            <UTable :data="data" class="grow"/>



        </div>
<!-- 
        <div class="flex justify-center gap-4 pt-3 ">
            <UButtonGroup>
                <UInput color="neutral" variant="outline" />
                <UBadge color="neutral" variant="outline" size="lg" :label="code" :ui="{label: 'uppercase'}"/>
            </UButtonGroup>
            <UButtonGroup>
                <UInput color="neutral" variant="outline" />
                <UBadge color="neutral" variant="outline" size="lg" :label="pln" />
            </UButtonGroup>
        </div> -->
    </div>
</template>

<style scoped>

</style>