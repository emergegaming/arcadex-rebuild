<template>
    <div id="button" ref="button"
         @touchstart="touch.buttonTouched($event)"
         @touchmove="touch.buttonTouched($event)"
         @touchend="touch.buttonTouched($event)">

        <slot/>
    </div>
</template>

<script>

import {TouchHelper} from "assets/ArcadeXTouchHelper.js";

export default {
    name: "ButtonControls",
    props: {
        asciiCode: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            touch: undefined
        }
    },
    mounted() {
        this.touch = new TouchHelper(this.$refs.button);
        this.touch.simulateKeyboardEvents(this.pseudoKeyboardEvent, this.asciiCode)
    },
    methods: {
        pseudoKeyboardEvent(asciiKey, pressed) {
            this.$emit('keyEvent', {asciiKey, pressed})
        }
    }
}
</script>

<style>

    #button {
        -webkit-touch-callout: none;

        /* iOS Safari */
        -webkit-user-select: none;

        /* Safari */
        -khtml-user-select: none;

        /* Konqueror HTML */
        -moz-user-select: none;

        /* Firefox */
        -ms-user-select: none;

        /* Internet Explorer/Edge */
        user-select: none;

        /* Non-prefixed version, currently supported by Chrome and Opera */
    }

</style>
