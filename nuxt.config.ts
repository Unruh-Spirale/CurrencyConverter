import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    modules: [
        "@nuxt/ui", "nuxt-charts"
    ],
    css: ["~/assets/css/main.css"],
    vite: {
        plugins: [
            tailwindcss(),
        ]
    },
    ssr: false,
    app: {
        baseURL: process.env.BASE_URL || (process.env.NODE_ENV === "production" ? "/CurrencyConverter/" : "/"),
        buildAssetsDir: "/_nuxt/"
    },
    router: {
        options: {
            hashMode: false
        }
    }
});
