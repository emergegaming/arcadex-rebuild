<template>
    <full-screen-landscape :force-full-screen="true" :force-landscape="true">
        <div class="flex flex-row w-full h-screen flex-grow">

            <!-- Left Column (Directional Control) -->
            <div class="flex flex-grow flex-col items-center justify-center">
                <DirectionControl @keyEvent="handleKeyEvent($event)" class="w-32 h-32 mb-5">
                    <div class="bg-blue-800 rounded-full pointer-events-none w-full h-full"></div>
                </DirectionControl>
            </div>

            <!-- Middle Column (Canvas) -->
            <div class="flex items-center justify-center">
                <DosCanvas class="ax-canvas" :zipPath="selectedGame.path" :exec="selectedGame.exec" :cycles="selectedGame.cycles" :opts="selectedGame.opts" :keyEvent="keyEvent"/>
            </div>

            <!-- Right Column (Buttons) -->
            <div class="flex flex-col flex-grow items-center justify-center">
                <ButtonControl :ascii-code="32" @keyEvent="handleKeyEvent($event)" class="w-16 h-16">
                    <div class="bg-gray-700 rounded-full pointer-events-none w-full h-full"></div>
                </ButtonControl>
                <ButtonControl :ascii-code="112" @keyEvent="handleKeyEvent($event)" class="w-16 h-16 mt-5 mb-5">
                    <div class="bg-red-800 rounded-full pointer-events-none w-full h-full"></div>
                </ButtonControl>
            </div>
        </div>

    </full-screen-landscape>
</template>

<script>

import FullScreenLandscape from "@/components/FullScreenLandscape.vue";
import DirectionControls from "@/components/DirectionControl.vue";
import DosCanvas from "@/components/DosCanvas.vue";

export default {
    name: "digger",
    components: {FullScreenLandscape, DirectionControls, DosCanvas},
    data() {
        return {
            games: {
                "digger": {         title:'Digger',         path: '/games/dos/digger.zip',        exec: 'DIGGER.COM',                   opts: '-c',     cycles:400},
                "bubble-bobble": {  title:'Bubble Bobble',  path: '/games/dos/bubble_bobble.zip', exec: './Bubble_Bobble/BUBBLE.EXE',   opts: '',       cycles:750}
            },
            keyEvent: undefined
        }
    },
    methods: {
        handleKeyEvent(keyEvent) {
            this.keyEvent = {asciiKey: keyEvent.asciiKey, pressed:keyEvent.pressed}
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
