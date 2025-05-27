<script setup lang="ts">

    const {data: currencyChf} = await useFetch("http://api.nbp.pl/api/exchangerates/rates/c/chf/?format=json")
    const {data: currencyChf90 } = await useFetch("http://api.nbp.pl/api/exchangerates/rates/a/chf/last/30/?format=json")
    const {data: currencyChfMid} = await useFetch("https://api.nbp.pl/api/exchangerates/rates/a/chf/")

    type CurrencyInfo = {code: string, icon: string};

    const currencies: CurrencyInfo[] = [
        {code: "eur", icon: "i-circle-flags-european-union"},
        {code: "usd", icon: "i-circle-flags-us"},
        {code: "chf", icon: "i-circle-flags-ch"},
        {code: "gbp", icon: "i-circle-flags-gb"},
    ]

</script>

<template>
    <div v-for="currency in currencies">
        <Currency :code="currency.code" :icon="currency.icon" />
    </div>
</template>

<style scoped>

</style>