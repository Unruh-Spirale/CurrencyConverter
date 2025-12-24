<script setup lang="ts">

    type NavSpec = {
        route: string;
        label: string;
        icon: string;
    }

    const buttonNavs: NavSpec[] = [
        {route: "/eur", label: "eur", icon: "i-circle-flags-european-union"},
        {route: "/usd", label: "usd", icon: "i-circle-flags-us"},
        {route: "/chf", label: "chf", icon: "i-circle-flags-ch"},
        {route: "/gbp", label: "gbp", icon: "i-circle-flags-gb"}
    ];

</script>

<template>
    <div class="mx-10">
        <header class="pt-8">
            <NuxtLink to="/" class="flex">
                <UIcon name="i-tdesign-currency-exchange" class="size-12" />
                <h1 class="uppercase text-center text-4xl ml-5">Currency converter</h1>
            </NuxtLink>
        </header>
        <div class="grid grid-cols-14 pt-8">
            <nav>
                <ul class="grid gap-4 uppercase">
                    <li v-for="nav in buttonNavs">
                        <NuxtLink :to="nav.route">
                            <UButton
                                :label="nav.label"
                                variant="ghost"
                                color="neutral"
                                size="xl"
                                :icon="nav.icon"
                                class="w-full"
                                :ui="{label: 'uppercase'}"
                            />
                        </NuxtLink>
                    </li>
                </ul>
            </nav>

            <div class="col-span-13 ml-10">
                <slot />
            </div>
        </div>


    </div>
</template>

<style scoped>

</style>