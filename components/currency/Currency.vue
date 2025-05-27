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
            buy: currency.value?.rates[0].bid,
            sell: currency.value?.rates[0].ask,
            average: currencyMid.value?.rates[0].mid
        }
    ])

    const source = ref("eur")
    const inputValue = ref<number>(0);
    const convertCurrencyToPln = computed<number>({
        get(): number {
            return source.value === "eur" ? inputValue.value : +(convertPlnToCurrency.value / (currency.value?.rates[0].ask ?? 0)).toFixed(2)
        },
        set(val): void {
            source.value = "eur"
            inputValue.value = val
        }
    })
    const convertPlnToCurrency = computed({
        get(): number {
            return source.value === "pln" ? inputValue.value : +(convertCurrencyToPln.value * (currency.value?.rates[0].bid ?? 0)).toFixed(2)
        },
        set(val): void {
            source.value = "pln"
            inputValue.value = val
        }
    })

    function validate(e) {
        const val = e.target.value.replace(',','.');
        if (!/^\d*\.?\d*$/.test(val)) {
            e.target.value = inputValue.value;
        } else {
            e.target.value = val;
            inputValue.value = val;
  }
    }
</script>

<template>
    <div>
        <div class="flex items-center gap-2">
            <div class="grid gap-2">
                <UButtonGroup>
                    <UBadge color="neutral" variant="outline" size="lg" :label="code" :ui="{base: 'border-1', label: 'uppercase'}"/>
                    <UInput v-model.number="convertCurrencyToPln" color="neutral" variant="outline" @input="validate"/>
                </UButtonGroup>
                <UButtonGroup>
                    <UBadge color="neutral" variant="outline" size="lg" :label="pln" :ui="{base: 'border-1'}"/>
                    <UInput v-model.number="convertPlnToCurrency" color="neutral" variant="outline" @input="validate"/>
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