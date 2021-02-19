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
        setTimeout(this.checkForKeyPress.bind(this), 50);
    },
    methods: {
        dosGameReady(ci) {
            console.log ("Dos Game Ready")
            window.Module = ci.dos;
            window.ci = ci;
        },
        checkForKeyPress: function() {
            while (this.keyEventQueue.length > 0) {
                if (window.ci) {
                    console.log("Q")
                    window.ci.simulateKeyEvent(this.keyEventQueue[0].asciiKey, this.keyEventQueue[0].pressed)
                }
                this.keyEventQueue.shift();
            }
            if (window.ci) setTimeout(this.checkForKeyPress.bind(this), 50);
        }
    },

}
</script>
