export default {
    ssr: false,
    target: 'static',
    head: {
        title: 'arcadex-rebuild',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'},
            {hid: 'description', name: 'description', content: ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ],
        script: [
            {src:'/js/vendor/dosbox/js-dos.js'}
        ]
    },

    css: [],

    plugins: [
    ],

    components: true,

    buildModules: [
        '@nuxtjs/tailwindcss',
    ],
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
    ],
    axios: {},
    pwa: {
        manifest: {
            lang: 'en'
        }
    },
    build: {
    },
    server: {
        host: "0.0.0.0"
    }
}
