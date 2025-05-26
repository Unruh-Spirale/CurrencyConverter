<script setup lang="ts">
        definePageMeta({
        layout: 'header-layout'
    })
    const {data: currencyChf} = await useFetch("http://api.nbp.pl/api/exchangerates/rates/c/chf/?format=json")
    const {data: currencyChf90 } = await useFetch("http://api.nbp.pl/api/exchangerates/rates/a/chf/last/30/?format=json")
    const {data: currencyChfMid} = await useFetch("https://api.nbp.pl/api/exchangerates/rates/a/chf/")

</script>

<template>
    <div>
        <h1>CHF</h1>
        <p>{{ currencyChf }}</p>
        <p>{{ currencyChf90 }}</p>
        <p>{{ currencyChfMid }}</p>
    </div>
</template>

<style scoped>

</style>