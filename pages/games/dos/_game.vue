<template>
    <full-screen-landscape :force-full-screen="requireFullScreen" :force-landscape="requireLandscape">
        <div class="flex flex-row w-full h-screen flex-grow">

            <!-- Left Column (Directional Control) -->
            <div class="flex flex-grow flex-col items-center justify-center">
                <DirectionControl @keyEvent="handleKeyEvent($event)" class="w-32 h-32 mb-5">
                    <div class="bg-blue-800 rounded-full pointer-events-none w-full h-full flex justify-center items-center">
                        <div class="bg-blue-700 rounded-full pointer-events-none w-10 h-10"></div>
                    </div>
                </DirectionControl>
            </div>

            <!-- Middle Column (Canvas) -->
            <div class="flex items-center justify-center">
                <DosCanvas class="ax-canvas" :zipPath="selectedGame.path" :exec="selectedGame.exec" :cycles="selectedGame.cycles" :opts="selectedGame.opts" :keyEventQueue="keyEventQueue"/>
            </div>

            <!-- Right Column (Buttons) -->
            <div class="flex flex-col flex-grow items-center justify-center">
                <div @click="exit" class="w-16 h-16 mt-5 mb-5">
                    <div class="bg-gray-800 rounded-full pointer-events-none w-full h-full flex items-center justify-center">Exit</div>
                </div>
                <ButtonControl :ascii-code="32" @keyEvent="handleKeyEvent($event)" class="w-16 h-16">
                    <div class="bg-gray-700 rounded-full pointer-events-none w-full h-full flex items-center justify-center">Space</div>
                </ButtonControl>
                <ButtonControl :ascii-code="112" @keyEvent="handleKeyEvent($event)" class="w-16 h-16 mt-5 mb-5">
                    <div class="bg-red-800 rounded-full pointer-events-none w-full h-full flex items-center justify-center">Fire</div>
                </ButtonControl>
            </div>
        </div>

    </full-screen-landscape>
</template>

<script>

import FullScreenLandscape from "@/components/FullScreenLandscape.vue";
import DirectionControls from "@/components/DirectionControl.vue";
import DosCanvas from "@/components/DosCanvas.vue";
import {ScreenModeHelper} from "assets/arcadex/ScreenModeHelper.js";

export default {
    name: "digger",
    components: {FullScreenLandscape, DirectionControls, DosCanvas},
    data() {
        return {
            games: {
                "digger": {         title:'Digger',         path: '/games/dos/digger.zip',        exec: 'DIGGER.COM',                   opts: '-c',     cycles:400},
                "bubble-bobble": {  title:'Bubble Bobble',  path: '/games/dos/bubble_bobble.zip', exec: './Bubble_Bobble/BUBBLE.EXE',   opts: '',       cycles:750}
            },
            keyEventQueue: [],
            requireLandscape: true,
            requireFullScreen: true,
        }
    },
    methods: {
        handleKeyEvent(keyEvent) {
            this.keyEventQueue.push(keyEvent)
        },
        exit() {
            window.ci.exit();
            this.requireFullScreen = false;
            this.requireLandscape = false;
            new ScreenModeHelper(window).exitFullScreen();
            this.$router.push('/');
        }
    },
    computed: {
        'game' : function () {
            return this.$route.params.game
        },
        'selectedGame' : function () {
            return this.games[this.game];
        }
    },
    head() {
        return {
            title: this.games[this.game].title
        }
    }
}
</script>

<style scoped>
    .ax-canvas {
        background-color: #000000;
        height: 85vh;
        width: 136vh;
    }
</style>
