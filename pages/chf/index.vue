<script setup lang="ts">
import type { CurrencyBuySell } from '~/types/currency'

    definePageMeta({
        layout: 'header-layout'
    })

    const {data: chf} = await useFetch("http://api.nbp.pl/api/exchangerates/rates/c/chf/?format=json")
    const {data: chfMid } = await useFetch("https://api.nbp.pl/api/exchangerates/rates/a/chf/")
    const {data: chf90} = await useFetch("http://api.nbp.pl/api/exchangerates/rates/a/chf/last/30/?format=json")


</script>

<template>
    <div class="pt-8">
        <table>
            <tr>
                <th>Buy</th>
                <th>Sell</th>
            </tr>
            <tr>
                <td>{{ chf.rates[0].ask }}</td>
                <td>{{ chf.rates[0].bid }}</td>
            </tr>
        </table>
    </div>
</template>

<style scoped>

</style>