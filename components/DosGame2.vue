<template>
    <div id="screen" ref="screen" class="flex w-full h-screen items-center justify-center bg-black">
        <div id="exit" class="absolute top-0 right-0 m-3 z-40 p-1 rounded-full border-4 border-gray-500 cursor-pointer" @click="exitGame()">
            <svg class="text-white w-8 h-8 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
        <div class="absolute h-screen flex flex-col w-full justify-center items-center z-30 bg-black" v-if="!landscape">
            <div class="py-2 px-4 text-white pointer-events-auto cursor-pointer flex flex-col items-center">
                <svg class="w-32 h-32" stroke="none" fill="currentColor" enable-background="new 0 0 100 100"  version="1.1" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><switch><foreignObject width="1" height="1" requiredExtensions="http://ns.adobe.com/AdobeIllustrator/10.0/"/><g><path d="m5273.1 2400.1v-2c0-2.8-5-4-9.7-4s-9.7 1.3-9.7 4v2c0 1.8 0.7 3.6 2 4.9l5 4.9c0.3 0.3 0.4 0.6 0.4 1v6.4c0 0.4 0.2 0.7 0.6 0.8l2.9 0.9c0.5 0.1 1-0.2 1-0.8v-7.2c0-0.4 0.2-0.7 0.4-1l5.1-5c1.3-1.3 2-3.1 2-4.9zm-9.7-0.1c-4.8 0-7.4-1.3-7.5-1.8 0.1-0.5 2.7-1.8 7.5-1.8s7.3 1.3 7.5 1.8c-0.2 0.5-2.7 1.8-7.5 1.8z"/><path d="m5268.4 2410.3c-0.6 0-1 0.4-1 1s0.4 1 1 1h4.3c0.6 0 1-0.4 1-1s-0.4-1-1-1h-4.3z"/><path d="m5272.7 2413.7h-4.3c-0.6 0-1 0.4-1 1s0.4 1 1 1h4.3c0.6 0 1-0.4 1-1s-0.4-1-1-1z"/><path d="m5272.7 2417h-4.3c-0.6 0-1 0.4-1 1s0.4 1 1 1h4.3c0.6 0 1-0.4 1-1 0-0.5-0.4-1-1-1z"/><path d="m8 21.2h31.3v20.3h5.5v-27.4c0-2.4-1.9-4.2-4.2-4.2h-33.9c-2.4 0-4.2 1.9-4.2 4.2v65.9c0 2.4 1.9 4.2 4.2 4.2h10.1v-16.3h-8.8v-46.7zm10.7-7.1h9.7c0.8 0 1.4 0.6 1.4 1.4s-0.6 1.4-1.4 1.4h-9.7c-0.8 0-1.4-0.6-1.4-1.4s0.7-1.4 1.4-1.4z"/><path d="m93.2 47.8h-65.8c-2.4 0-4.3 1.9-4.3 4.3v33.8c0 2.4 1.9 4.3 4.3 4.3h65.8c2.3 0 4.3-1.9 4.3-4.3v-33.8c0-2.3-1.9-4.3-4.3-4.3zm-61.9 24.8c-2 0-3.5-1.6-3.5-3.5 0-2 1.6-3.6 3.5-3.6 2 0 3.5 1.6 3.5 3.6 0 1.9-1.6 3.5-3.5 3.5zm54.8 12h-46.7v-31.3h46.7v31.3zm7.1-10.8c0 0.8-0.6 1.4-1.4 1.4s-1.4-0.6-1.4-1.4v-9.7c0-0.8 0.6-1.4 1.4-1.4s1.4 0.6 1.4 1.4v9.7z"/><path d="m62.2 33.8c-0.5-0.5-0.7-1.1-0.7-1.7s0.2-1.3 0.7-1.7c1-1 2.5-1 3.5 0l2.1 2.1c-0.7-6.5-6.2-11.7-12.9-11.7-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5c9.5 0 17.3 7.5 17.9 16.8l2.4-2.4c1-1 2.5-1 3.5 0s1 2.5 0 3.5l-6.5 6.5c-1 1-2.5 1-3.5 0l-6.5-6.4z"/></g></switch></svg>
                <span>rotate device</span>
            </div>
        </div>
        <div class="absolute h-screen flex flex-col w-full justify-center items-center z-20 bg-black" v-if="!fullscreen">
            <div class="py-2 px-4 border border-white rounded-md bg-blue-900 pointer-events-auto cursor-pointer" @click="goFullScreen()">ENTER FULLSCREEN</div>
        </div>
        <div class="absolute h-screen flex flex-col w-full justify-center items-center z-10 bg-black" v-if="state !== 'playing'">
            <div v-if="state==='loading'">Loading...</div>
            <div v-if="state==='loaded'" class="py-2 px-4 border border-white rounded-md bg-blue-900 z-10 pointer-events-auto cursor-pointer" @click="startGame">START GAME</div>
        </div>
        <div class="absolute h-screen flex w-full justify-center">
            <div class="flex flex-grow justify-center items-end" v-if="touch">
                <div class="relative w-40 h-40 er-no-touch mb-10">
                    <img src="/images/dos-console/D-Pad.svg" class="absolute flex w-40 h-40"/>
                    <div class="flex absolute w-40 h-40 flex-col z-10">
                        <div class="flex flex-grow w-40">
                            <div class="flex flex-grow"></div>
                            <div id="up" class="flex flex-grow"></div>
                            <div class="flex flex-grow"></div>
                        </div>
                        <div class="flex flex-grow w-40">
                            <div id="left" class="flex flex-grow"></div>
                            <div class="flex flex-grow"></div>
                            <div id="right" ref="right" class="flex flex-grow"></div>
                        </div>
                        <div class="flex flex-grow w-40">
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
                <div class="flex relative w-20 h-20 mb-10">
                    <img src="/images/dos-console/Btn-A.svg" class="absolute w-20 h-20"/>
                    <div id="a" ref="a" class="absolute w-20 h-20 z-10"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    // Don't allow screen dragging
    // Detect fullscreen,

    // Include JavaScript
    // Type Cycles to Integer
    // Reasonable Defaults
    // Clean Up (Refactor for React)
    // Splash Screen Overlay
    // Make it available for multiple games
    // Create keycode mapping
    // Title

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
            landscape: undefined,
            fullscreen: undefined,
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
        this.checkOrientation();
        this.checkFullscreen();
        this.setupScreenListeners();

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
        startGame() {
            this.setupTouchListeners();
            this.state = 'playing';
        },
        exitGame() {
            this.state = 'exiting'
            this.destroyEventListeners();
            this.exitFullscreen();
            window.ci.exit();
            setTimeout(() => {
                this.$router.push({path:'/'})
            })
        },
        goFullScreen() {
            this.$refs.screen.requestFullscreen();
        },
        exitFullscreen() {
            if (document.fullscreenElement)
                document.exitFullscreen();
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
                    if (element.id === 'exit') {
                        this.exitGame();
                    }
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
        setupTouchListeners() {
            this.$refs.screen.addEventListener('touchmove', this.handleTouchEvent)
            this.$refs.screen.addEventListener('touchstart', this.handleTouchEvent)
            this.$refs.screen.addEventListener('touchend', this.handleTouchEvent)
        },
        setupScreenListeners() {
            try {
            } finally {
                self = this;
                window.addEventListener("orientationchange", this.checkOrientation);
                document.addEventListener("fullscreenchange", this.checkFullscreen);
            }
        },
        destroyEventListeners() {
            this.$refs.screen.removeEventListener('touchmove', this.handleTouchEvent)
            this.$refs.screen.removeEventListener('touchstart', this.handleTouchEvent)
            this.$refs.screen.removeEventListener('touchend', this.handleTouchEvent)
            window.removeEventListener("orientationchange", this.checkOrientation);
            document.removeEventListener("fullscreenchange", this.checkFullscreen);
        },
        checkOrientation() {
            setTimeout(() => {
                this.landscape = window.screen.width > window.screen.height;
            })
        },
        checkFullscreen() {
            setTimeout(() => {
                this.fullscreen = !!document.fullscreenElement;
            })
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
