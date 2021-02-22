<template>
    <canvas id="canvas" ref="canvas"/>
</template>

<script>

import {DosEmulator} from "assets/arcadex/DosEmulator.js";
import {ScreenModeHelper} from "assets/arcadex/ScreenModeHelper.js";

export default {
    name: "DosCanvas",
    props: {
        zipPath: {required: true},
        exec:{required: true},
        opts:{required: false, default: null},
        cycles: {required: false, default: 700},
        keyEventQueue: {required: false, default:[]},
        playing: {required:false, default:false}
    },
    data() {
        return {
            running: false
        }
    },
    mounted() {
        let emulator = new DosEmulator('/js/vendor/dosbox/wdosbox.js', this.$refs.canvas);
        emulator.setReadyListener(this.dosGameReady);
        emulator.run(this.zipPath, this.exec, this.opts, this.cycles);
    },
    methods: {
        dosGameReady(ci) {
            this.$emit('started')
            this.running = true;
            window.Module = ci.dos;
            window.ci = ci;
            setTimeout(this.checkForKeyPress, 50);
        },
        checkForKeyPress: function() {
            while (this.keyEventQueue.length > 0) {
                if (window.ci) {
                    console.log (this.keyEventQueue[0].asciiKey, this.keyEventQueue[0].pressed)
                    window.ci.simulateKeyEvent(this.keyEventQueue[0].asciiKey, this.keyEventQueue[0].pressed)
                }
                this.keyEventQueue.shift();
            }
            if (this.running) setTimeout(this.checkForKeyPress, 20);
        }
    },
    watch: {
        'playing': function(newVal) {
            if (newVal === false && this.running === true) {
                window.ci.exit();
                this.running = false
                this.playing = false;
                this.requireFullScreen = false;
                this.requireLandscape = false;
                new ScreenModeHelper(window).exitFullScreen();
                this.$router.push('/');
            }
        }
    }

}
</script>
