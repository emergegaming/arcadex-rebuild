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
        keyEventQueue: {required: false, default:[]}
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
        keyEventQueue: function(keyEvents) {
            while (keyEvents.length > 0) {
                if (window.ci) {
                    window.ci.simulateKeyEvent(keyEvents[0].asciiKey, keyEvents[0].pressed)
                }
                keyEvents.shift();
            }
        }
    }
}
</script>
