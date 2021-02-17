<template>
    <full-screen-landscape :force-full-screen="true" :force-landscape="true">
        <div class="flex flex-row w-full h-screen flex-grow">

            <!-- Left Column (Directional Control) -->
            <div class="flex flex-grow flex-col items-center justify-end">
                <DirectionControl @keyEvent="handleKeyEvent($event)" class="w-32 h-32 mb-5">
                    <div class="bg-blue-500 rounded-full pointer-events-none w-full h-full"></div>
                </DirectionControl>
            </div>

            <!-- Middle Column (Canvas) -->
            <div class="flex bg-blue-500 items-center justify-center">
                <!--
                <DosGame4 class="ax-canvas"/>
                -->
            </div>

            <!-- Right Column (Buttons) -->
            <div class="flex flex-col flex-grow items-center justify-end">
                <ButtonControl :ascii-code="97" @keyEvent="handleKeyEvent($event)" class="w-20 h-20 mb-5">
                    <div class="bg-red-500 rounded-full pointer-events-none w-full h-full"></div>
                </ButtonControl>
                <ButtonControl :ascii-code="122" @keyEvent="handleKeyEvent($event)" class="w-20 h-20 mb-5">
                    <div class="bg-red-500 rounded-full pointer-events-none w-full h-full"></div>
                </ButtonControl>
            </div>
        </div>

        <!--
        <dos-game-3 :path="selectedGame.path" :exec="selectedGame.exec" :cycles="selectedGame.cycles" :opts="selectedGame.opts"/>
        -->
    </full-screen-landscape>
</template>

<script>

import FullScreenLandscape from "@/components/FullScreenLandscape.vue";
import DirectionControls from "@/components/DirectionControl.vue";

export default {
    name: "digger",
    components: {FullScreenLandscape, DirectionControls},
    data() {
        return {
            games: {
                "digger": {         title:'Digger',         path: '/games/dos/digger.zip',        exec: 'DIGGER.COM',                   opts: '-c',     cycles:400},
                "bubble-bobble": {  title:'Bubble Bobble',  path: '/games/dos/bubble_bobble.zip', exec: './Bubble_Bobble/BUBBLE.EXE',   opts: '',       cycles:750}
            }
        }
    },
    methods: {
        handleKeyEvent(keyEvent) {
            console.log (keyEvent);
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
        background-color: #ff0000;
        height: 80vh;
        width: 128vh;
    }
</style>
