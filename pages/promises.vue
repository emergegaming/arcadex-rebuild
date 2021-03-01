

<template>

</template>

<script>

import {setupOcr} from "assets/arcadex/ocr2.js";
import {games} from "assets/arcadex/games.js";

export default {
    name: "promises.vue",
    mounted() {
        // _startX, _startY, _charWidth, _charHeight, _charSpacing, _numChars, _referenceChars
        setupOcr(12, 0, 10, 12, 2, 5, games.digger.ocrScore.referenceChars);

        // let stack = []
        // let a = this.processImage().then(variable => {
        //     console.log("Mark");
        // });
        // let b = this.processImage().then(variable => {
        //     console.log("is");
        // });
        // let c = this.processImage().then(variable => {
        //     console.log("amazing!");
        // });
        // Promise.all([a, b, c]).then(() => {
        //     console.log ("Compliment complete");
        // })
    },
    methods: {
        // processImage() {
        //     return new Promise((resolve, reject) => {
        //         let i = new Image();
        //         i.addEventListener('load', () => {resolve('ok')})
        //         i.src = 'https://trendsandmanagement.com/wp-content/uploads/2020/10/trust_vs_forest.jpg?reload' + Math.round(Math.random() * 10000);
        //     });
        // }
    }
}
</script>
