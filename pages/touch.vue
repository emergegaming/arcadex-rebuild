<template>
    <div id="screen" class="flex w-full h-screen items-center justify-center bg-black"><!-- v-touch:tap="fullScreen" -->
        <div class="flex w-full">
            <div class="flex flex-grow justify-center items-end">
                <div class="relative w-32 h-32">
                    <img src="/images/dos-console/D-Pad.svg" class="absolute flex w-32 h-32"/>
                    <div class="flex absolute w-32 h-32 flex-col z-10">
                        <div class="flex flex-grow w-32 text-white">
                            <div class="flex flex-grow"></div>
                            <div id="up" class="flex flex-grow"></div>
                            <div class="flex flex-grow"></div>
                        </div>
                        <div class="flex flex-grow w-32 text-white">
                            <div id="left" class="flex flex-grow"></div>
                            <div class="flex flex-grow"></div>
                            <div id="right" ref="right" class="flex flex-grow"></div>
                        </div>
                        <div class="flex flex-grow w-32 text-white">
                            <div class="flex flex-grow"></div>
                            <div id="down" class="flex flex-grow"></div>
                            <div class="flex flex-grow"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-64"></div>
            <div class="flex flex-grow flex-col justify-end items-center">
                <div  class="flex relative w-20 h-20">
                    <img src="/images/dos-console/Btn-B.svg" class="absolute w-20 h-20"/>
                    <div id="b" ref="b" class="absolute w-20 h-20 z-10"></div>
                </div>
                <div class="h-2"></div>
                <div class="flex relative w-20 h-20">
                    <img src="/images/dos-console/Btn-A.svg" class="absolute w-20 h-20"/>
                    <div id="a" ref="a" class="absolute w-20 h-20 z-10"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "touch",
    mounted() {
        try {
            document.removeEventListener('touchmove', this.handleTouchEvent)
            document.removeEventListener('touchstart', this.handleTouchEvent)
        } finally {
            document.addEventListener('touchmove', this.handleTouchEvent)
            document.addEventListener('touchstart', this.handleTouchEvent)
        }

    },
    methods: {
        handleTouchEvent(event) {
            for (let i = 0; i < event.touches.length; i++) {
                let x = event.touches[i].clientX;
                let y = event.touches[i].clientY;
                let element = document.elementFromPoint(x, y);
                if (element.id) {
                    console.log (element.id + " active")
                }
            }
        }
    }
}
</script>

<style scoped>

</style>
