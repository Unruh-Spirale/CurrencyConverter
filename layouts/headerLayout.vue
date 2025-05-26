<script setup lang="ts">

</script>

<template>
    <div class="ms-20">
        <header class="flex pt-8">
            <UIcon name="i-tdesign-currency-exchange" class="size-12" />
            <h1 class="uppercase text-center text-4xl ml-5">Currency converter</h1>
        </header>
        <!-- <div class="grid grid-cols-2"> -->
        <nav class="container mx-auto p-4 flex justify-between">
            <ul class="flex gap-4 uppercase">
                <li><NuxtLink to="/eur">eur</NuxtLink></li>
                <li><NuxtLink to="/usd">usd</NuxtLink></li>
                <li><NuxtLink to="/chf">chf</NuxtLink></li>
                <li><NuxtLink to="/gbp">gbp</NuxtLink></li>
                <li><NuxtLink to="/currency">currency</NuxtLink></li>
            </ul>
        </nav>


        <div>
            <slot />
        </div>
        <!-- </div> -->


    </div>
</template>

<style scoped>

</style>