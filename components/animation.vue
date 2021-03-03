<template>
    <div ref="container"></div>
</template>

<script>

import lottie from 'assets/arcadex/lottie.min.js';

export default {
    name: "animation",
    props: {
        path: {
            required:true
        }
    },
    mounted() {
        let anim = lottie.loadAnimation({
            wrapper: this.$refs.container,
            animType: 'svg',
            loop: true,
            path: this.path
        })
    }
}
</script>

<style scoped>

</style>
