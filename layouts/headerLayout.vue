<script setup lang="ts">

</script>

<template>
    <div class="ms-20">
        <header class="pt-8">
            <NuxtLink to="/" class="flex">
                <UIcon name="i-tdesign-currency-exchange" class="size-12" />
                <h1 class="uppercase text-center text-4xl ml-5">Currency converter</h1>
            </NuxtLink>
        </header>
        <div class="grid grid-cols-14 pt-8">
            <nav>
                <ul class="grid gap-4 uppercase">
                    <li>
                        <NuxtLink to="/eur">
                            <UButton
                                label="eur"
                                variant="ghost"
                                color="neutral"
                                size="xl"
                                icon="i-circle-flags-european-union"
                                :ui="{label: 'uppercase'}"
                            />
                        </NuxtLink>
                    </li>
                    <li><NuxtLink to="/usd">
                            <UButton
                                label="usd"
                                variant="ghost"
                                color="neutral"
                                size="xl"
                                icon="i-circle-flags-us"
                                :ui="{label: 'uppercase'}"
                            />
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/chf">
                            <UButton
                                label="chf"
                                variant="ghost"
                                color="neutral"
                                size="xl"
                                icon="i-circle-flags-ch"
                                :ui="{label: 'uppercase'}"
                            />
                        </NuxtLink>
                    </li>
                    <li><NuxtLink to="/gbp">
                            <UButton
                                label="gbp"
                                variant="ghost"
                                color="neutral"
                                size="xl"
                                icon="i-circle-flags-gb"
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