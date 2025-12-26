<script setup lang="ts">
    definePageMeta({
        layout: "header-layout"
    });
</script>

<template>
    <Currency code="usd" icon="i-circle-flags-us"/>
    <CurrencyChart code="usd" color="#008000" color-button="success" />
</template>