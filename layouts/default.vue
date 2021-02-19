<template>
    <section class="h-screen bg-black text-white">
        <Nuxt />
        <!--
        <div class="absolute bottom-0 w-full text-sm p-2 text-right">&copy; Emerge Gaming &mdash; {{year}}</div>
        -->
    </section>
</template>
<script>
    export default {
        name: "Layout",
        data() {
            return {
                "year": new Date().getFullYear()
            }
        },
    }
</script>
