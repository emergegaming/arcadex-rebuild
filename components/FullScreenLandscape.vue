<template>
    <!-- Container, fills the entire viewport -->
    <div id="screen" ref="screen" class="flex relative w-full h-screen items-center justify-center">
        <!-- Full screen overlay + icon -->
        <div class="absolute flex w-full h-screen text-white justify-center items-center bg-black z-20" v-if="forceFullScreen && !fullscreen" @click="goFullScreen">
            <svg class="w-32 h-32 pointer-events-none" stroke="none" fill="currentColor" enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="M0,0v38.889l16.667-16.667l16.667,16.667l5.555-5.555L22.222,16.667L38.889,0H0z"/><path d="M100,0v38.889L83.333,22.222L66.667,38.889l-5.556-5.555l16.666-16.667L61.111,0H100z"/><path d="M0,100V61.111l16.667,16.666l16.667-16.666l5.555,5.556L22.222,83.333L38.889,100H0z"/><path d="M100,100V61.111L83.333,77.777L66.667,61.111l-5.556,5.556l16.666,16.666L61.111,100H100z"/></svg>
        </div>
        <!-- Landscape screen overlay + icon -->
        <div class="absolute flex w-full h-screen text-white justify-center items-center bg-black z-30" v-if="forceLandscape && !landscape">
            <svg class="w-32 h-32" stroke="none" fill="currentColor" enable-background="new 0 0 100 100"  version="1.1" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><switch><foreignObject width="1" height="1" requiredExtensions="http://ns.adobe.com/AdobeIllustrator/10.0/"/><g><path d="m5273.1 2400.1v-2c0-2.8-5-4-9.7-4s-9.7 1.3-9.7 4v2c0 1.8 0.7 3.6 2 4.9l5 4.9c0.3 0.3 0.4 0.6 0.4 1v6.4c0 0.4 0.2 0.7 0.6 0.8l2.9 0.9c0.5 0.1 1-0.2 1-0.8v-7.2c0-0.4 0.2-0.7 0.4-1l5.1-5c1.3-1.3 2-3.1 2-4.9zm-9.7-0.1c-4.8 0-7.4-1.3-7.5-1.8 0.1-0.5 2.7-1.8 7.5-1.8s7.3 1.3 7.5 1.8c-0.2 0.5-2.7 1.8-7.5 1.8z"/><path d="m5268.4 2410.3c-0.6 0-1 0.4-1 1s0.4 1 1 1h4.3c0.6 0 1-0.4 1-1s-0.4-1-1-1h-4.3z"/><path d="m5272.7 2413.7h-4.3c-0.6 0-1 0.4-1 1s0.4 1 1 1h4.3c0.6 0 1-0.4 1-1s-0.4-1-1-1z"/><path d="m5272.7 2417h-4.3c-0.6 0-1 0.4-1 1s0.4 1 1 1h4.3c0.6 0 1-0.4 1-1 0-0.5-0.4-1-1-1z"/><path d="m8 21.2h31.3v20.3h5.5v-27.4c0-2.4-1.9-4.2-4.2-4.2h-33.9c-2.4 0-4.2 1.9-4.2 4.2v65.9c0 2.4 1.9 4.2 4.2 4.2h10.1v-16.3h-8.8v-46.7zm10.7-7.1h9.7c0.8 0 1.4 0.6 1.4 1.4s-0.6 1.4-1.4 1.4h-9.7c-0.8 0-1.4-0.6-1.4-1.4s0.7-1.4 1.4-1.4z"/><path d="m93.2 47.8h-65.8c-2.4 0-4.3 1.9-4.3 4.3v33.8c0 2.4 1.9 4.3 4.3 4.3h65.8c2.3 0 4.3-1.9 4.3-4.3v-33.8c0-2.3-1.9-4.3-4.3-4.3zm-61.9 24.8c-2 0-3.5-1.6-3.5-3.5 0-2 1.6-3.6 3.5-3.6 2 0 3.5 1.6 3.5 3.6 0 1.9-1.6 3.5-3.5 3.5zm54.8 12h-46.7v-31.3h46.7v31.3zm7.1-10.8c0 0.8-0.6 1.4-1.4 1.4s-1.4-0.6-1.4-1.4v-9.7c0-0.8 0.6-1.4 1.4-1.4s1.4 0.6 1.4 1.4v9.7z"/><path d="m62.2 33.8c-0.5-0.5-0.7-1.1-0.7-1.7s0.2-1.3 0.7-1.7c1-1 2.5-1 3.5 0l2.1 2.1c-0.7-6.5-6.2-11.7-12.9-11.7-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5c9.5 0 17.3 7.5 17.9 16.8l2.4-2.4c1-1 2.5-1 3.5 0s1 2.5 0 3.5l-6.5 6.5c-1 1-2.5 1-3.5 0l-6.5-6.4z"/></g></switch></svg>
        </div>
        <!-- Internal content beneath -->
        <slot/>
    </div>
</template>

<script>

/**
 * This component displays a "please rotate" or "enter full screen" overlay over its content if required.
 */
import {ScreenModeHelper} from "assets/arcadex/ScreenModeHelper";

export default {
    name: "FullScreenLandscape",
    props: {
        forceFullScreen: {
            required: false,
            type: Boolean,
            default: true
        },
        forceLandscape: {
            required: false,
            type: Boolean,
            default: true,
        }
    },
    data() {
        return {
            screenHelper: undefined,
            fullscreen: undefined,
            landscape: undefined
        }
    },
    mounted() {
        this.screenHelper = new ScreenModeHelper(window, this.$refs.screen);
        this.screenHelper.setOrientationListener(this.orientationChanged);
        this.screenHelper.setFullScreenListener(this.fullScreenChanged);
        this.screenHelper.checkNow();
    },
    methods: {
        orientationChanged(orientation) {
            this.landscape = orientation === 'landscape';
        },
        fullScreenChanged(fullscreen) {
            this.fullscreen = fullscreen;
        },
        goFullScreen() {
            this.screenHelper.setFullScreen();
        }

    }
}
</script>

<style scoped>

</style>
