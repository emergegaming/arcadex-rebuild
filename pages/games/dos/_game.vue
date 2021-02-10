<template>
    <dos-game-2 :path="selectedGame.path" :exec="selectedGame.exec" :cycles="selectedGame.cycles" :opts="selectedGame.opts"/>
</template>

<script>

import DosGame2 from "~/components/DosGame2.vue";

export default {
    name: "digger",
    components: {DosGame2},
    data() {
        return {
            games: {
                "digger": {         title:'Digger',         path: '/games/dos/digger.zip',        exec: 'DIGGER.COM',                   opts: '-c',     cycles:750},
                "bubble-bobble": {  title:'Bubble Bobble',  path: '/games/dos/bubble_bobble.zip', exec: './Bubble_Bobble/BUBBLE.EXE',   opts: '',       cycles:750}
            }
        }
    },
    mounted() {
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
