<template>
    <div id="touchpad" ref="touchpad"
         @touchstart="touch.elementTouched($event)"
         @touchmove="touch.elementTouched($event)"
         @touchend="touch.elementTouched($event)">
        <slot/>
    </div>
</template>

<script>

import {TouchHelper} from "assets/arcadex/TouchHelper";

export default {

    name: "DirectionControl",
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            touch:undefined
        }
    },
    mounted() {
        this.touch = new TouchHelper(this.$refs.touchpad);
        this.touch.simulateKeyboardEvents(this.pseudoKeyboardEvent)
    },
    methods: {
        pseudoKeyboardEvent(key, pressed) {
            this.$emit('keyEvent', {asciiKey:key, pressed:pressed})
        }
    }

}
</script>

<style>

    #touchpad {
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
