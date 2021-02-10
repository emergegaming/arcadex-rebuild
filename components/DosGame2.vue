<template>
    <div class="flex w-full h-screen items-center justify-center bg-blue-700">
        <canvas id="canvas" ref="canvas"></canvas>
    </div>
</template>

<script>
export default {

    // Include JavaScript
    // Type Cycles to Integer

    name: "DosGame2",
    props: [
        'path', 'exec', 'cycles', 'opts'
    ],
    mounted() {
        let canvas = this.$refs.canvas;
        let self = this;
        Dos(canvas, {
            wdosboxUrl: '/js/vendor/dosbox/wdosbox.js',
            cycles: self.cycles
        }).ready(function (fs, main){
            fs.extract(self.path).then(
                () => main([self.opts, self.exec]).then(
                    (ci) => {
                        window.Module = ci.dos;
                        window.ci = ci;
                    }
                )
            )
        })
    }
}
</script>

<style scoped>
    canvas {
        user-select: none;
        height: 80vh;
    }
</style>
