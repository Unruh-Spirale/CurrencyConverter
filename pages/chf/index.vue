<script setup lang="ts">
    definePageMeta({
        layout: "header-layout"
    });
</script>

<template>
    <Currency code="chf" icon="i-circle-flags-ch"/>
    <CurrencyChart code="chf" color="#ff0000" color-button="error" />
</template>