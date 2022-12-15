// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/scss/materialdesignicons.scss"
  ],

  build: {
    transpile: ["vuetify"]
  },

  vite: {
    define: {
      "process.env.DEBUG": false
    },
    build: {
      outDir: ".output/public"
    }
  },

  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content: "width=device-width,initial-scale=1"
        },
        {
          name: "theme-color",
          content: "#3eaf7c"
        }
      ]
    }
  },

  experimental: {
    payloadExtraction: false
  },

  srcDir: "src/",
  ssr: true
});
