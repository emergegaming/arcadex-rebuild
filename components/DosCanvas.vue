<template>
    <canvas id="canvas" ref="canvas"/>
</template>

<script>

import {DosEmulator} from "assets/arcadex/DosEmulator.js";

export default {
    name: "DosCanvas",
    props: {
        zipPath: {required: true},
        exec:{required: true},
        opts:{required: false, default: null},
        cycles: {required: false, default: 700},
        keyEvent: {required: false}

    },
    mounted() {
        let emulator = new DosEmulator('/js/vendor/dosbox/wdosbox.js', this.$refs.canvas);
        emulator.setReadyListener(this.dosGameReady);
        emulator.run(this.zipPath, this.exec, this.opts, this.cycles);
    },
    methods: {
        dosGameReady(ci) {
            console.log ("Dos Game Ready")
            window.Module = ci.dos;
            window.ci = ci;
        }
    },
    watch: {
        'keyEvent': {
            deep: true,
            handler(event) {
                console.log(event.asciiKey + ":" + event.pressed)
                if (window.ci) {
                    window.ci.simulateKeyEvent(event.asciiKey, event.pressed)
                }
            }
        }
    }
}
</script>

<style scoped>

</style>
