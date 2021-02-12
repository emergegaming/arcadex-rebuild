<template>
    <div id="screen" class="flex w-full h-screen items-center justify-center bg-black"><!-- v-touch:tap="fullScreen" -->
        <div class="absolute h-screen flex w-full justify-center items-center z-10 bg-black" v-if="state !== 'playing'">
            <div v-if="state==='loading'">Loading...</div>
            
            <div v-if="state==='loaded'" class="py-2 px-4 border border-white rounded-md bg-blue-900 z-20 pointer-events-auto cursor-pointer" @click="start">START GAME</div>
        </div>
        <div class="absolute h-screen flex w-full justify-center">
            <div class="flex flex-grow justify-center items-end" v-if="touch">
                <div class="relative w-32 h-32 er-no-touch">
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
            <canvas id="canvas" ref="canvas" class="flex"></canvas>
            <div class="flex flex-grow flex-col justify-end items-center er-no-touch" v-if="touch">
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

    // Include JavaScript
    // Type Cycles to Integer
    // Reasonable Defaults
    // Clean Up (Refactor for React)
    // Splash Screen Overlay
    // Make it available for multiple games
    // Create keycode mapping

    name: "DosGame2",
    props: [
        'path', 'exec', 'cycles', 'opts'
    ],
    data() {
        return {
            directionActive: 'none',
            buttonActive: 'none',
            touch: this.isTouch(),
            state: 'loading',
            directions: ['up', 'down', 'left', 'right'],
            buttons: ['a', 'b'],
            lastDirection: undefined,
            lastButton: undefined,
            keyCodeMapping: {
                'up':'38',
                'down':'40',
                'left':'37',
                'right':'39',
                'a':'112',
                'b':'32',
            }

        }
    },
    mounted() {
        let canvas = this.$refs.canvas;
        let self = this;
        Dos(canvas, {
            wdosboxUrl: '/js/vendor/dosbox/wdosbox.js',
            cycles: self.cycles
        }).ready(function (fs, main){
            fs.extract(self.path).then(
                () => main([self.opts, self.exec]).then(
                    (ci) => {
                        window.Module = ci.dos;
                        window.ci = ci;
                        self.state = 'loaded'
                    }
                )
            )
        });
    },
    methods: {
        start() {
            console.log("start")
            this.fullScreen();
            this.state = 'playing';
            this.setupListeners();
        },
        fullScreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            }
        },
        handleTouchEvent(event) {
            event.preventDefault();
            event.stopPropagation();
            let direction = undefined
            let button = undefined

            for (let i = 0; i < event.touches.length; i++) {
                let x = event.touches[i].clientX;
                let y = event.touches[i].clientY;
                let element = document.elementFromPoint(x, y);
                if (element.id) {
                    if (this.directions.includes(element.id)) {
                        direction = element.id;
                    } else if (this.buttons.includes(element.id)) {
                        button = element.id;
                    }
                }
            }
            if (this.lastDirection && direction !== this.lastDirection) {
                this.simulateKeyPress(this.lastDirection, false);
            }
            if (direction) {
                this.simulateKeyPress(direction, true)
            }
            if (this.lastButton && button !== this.lastButton) {
                this.simulateKeyPress(this.lastButton, false);
            }
            if (button) {
                this.simulateKeyPress(button, true)
            }
            this.lastDirection = direction;
            this.lastButton = button;
        },
        simulateKeyPress(action, state) {
            console.log (action + " " + (state ? 'on':'off'));
            if (window.ci) {

                window.ci.simulateKeyEvent(this.keyCodeMapping[action], state);
            }
        },
        isTouch() {
            return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));

        },
        setupListeners() {
            try {
                document.removeEventListener('touchmove', this.handleTouchEvent)
                document.removeEventListener('touchstart', this.handleTouchEvent)
                document.removeEventListener('touchend', this.handleTouchEvent)
            } finally {
                document.addEventListener('touchmove', this.handleTouchEvent)
                document.addEventListener('touchstart', this.handleTouchEvent)
                document.addEventListener('touchend', this.handleTouchEvent)
            }
        }
    }
}
</script>

<style scoped>
    #screen{
        user-select: none;
    }

    canvas {
        height: 80vh;
    }

    .er-no-touch {
        touch-action: none;
    }

</style>
