<script setup lang="ts">
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
    <div>
        <CurrencyAllCurrenciesChart/>
    </div>
</template>

<style scoped>

</style>