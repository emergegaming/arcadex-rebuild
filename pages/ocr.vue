<template>
    <section class="bg-red-900">
        <img :src="image1" class="inline m-1">
        <img :src="image2" class="inline m-1">
        <img :src="image3" class="inline m-1">
        <img :src="image4" class="inline m-1">
        <img :src="image5" class="inline m-1">
        <img :src="image6" class="inline m-1">
        <img :src="image7" class="inline m-1">
        <img :src="image8" class="inline m-1">
        <img :src="image9" class="inline m-1">
        <img :src="image10" class="inline m-1">
        <img :src="image11" class="inline m-1">
        <img :src="image12" class="inline m-1">
        <div class="clear-both"/>
        <img ref="image1" class="inline-block"/>
        <img ref="image2" class="inline-block"/>
        <img ref="image3" class="inline-block"/>
        <img ref="image4" class="inline-block"/>
        <img ref="image5" class="inline-block"/>

    </section>
</template>


<script>

import {
    image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12,
    d0, d1, d2, d3, d4, d5, d6, d7, d8, d9
} from "assets/arcadex/screenshots.js";
import {} from "assets/arcadex/screenshots.js";

export default {
    name: "ocr",
    data() {
        return {
            image1: image1,
            image2: image2,
            image3: image3,
            image4: image4,
            image5: image5,
            image6: image6,
            image7: image7,
            image8: image8,
            image9: image9,
            image10: image10,
            image11: image11,
            image12: image12,
            digits:{d0:d0,d1:d1,d2:d2,d3:d3,d4:d4,d5:d5,d6:d6,d7:d7,d8:d8,d9:d9}
        }
    },
    mounted() {

        let referenceDigit = [];
        for (let i = 0; i < 10; i++) {
            referenceDigit[i] = this.extractCharacter(this.digits['d' + i], 0, 0, 10, 12).substr(70);
        }

        let score = '';

        for (let i = 0; i < 5; i++) {
            let scoreChar = this.extractDiggerCharacter(image12, (i + 1) * 12);
            for(let j = 0; j <10; j++) {
                if (scoreChar === referenceDigit[j]) {
                    score += j;
                }
            }
        }
        console.log (parseInt(score,10));
    },
    methods: {
        extractDiggerCharacter(imageData, startX) {
            return this.extractCharacter(imageData, startX, 0, 10, 12).substr(70);
        },
        extractCharacter(imageData, startX, startY, width, height) {

            let elem = document.createElement('canvas');
            let canvas = elem.getContext('2d');
            elem.width = 10;
            elem.height = 12;
            let i = new Image()
            i.src = imageData
            canvas.drawImage(i, startX, startY, width, height, 0, 0, width, height)

            return elem.toDataURL()
        }
    }
}
</script>

<style scoped>
img {image-rendering: crisp-edges;}
</style>
