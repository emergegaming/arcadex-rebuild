<template>
    <div id="screen" ref="screen" class="flex w-full h-screen items-center justify-center bg-black">
        <div class="absolute h-screen flex w-full justify-center">
            <div class="flex flex-grow justify-center items-end"><!--  v-if="touch" -->
                <div class="relative w-40 h-40 er-no-touch mb-10">
                    <img src="/images/dos-console/D-Pad.svg" class="absolute flex w-40 h-40"/>
                    <div>
                        <div>
                            <div></div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="canvas" ref="canvas" class="flex bg-red-500"></div>
            <div class="flex flex-grow flex-col justify-end items-center er-no-touch"><!--  v-if="touch" -->
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
    // Map SpaceBar

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
    mounted2() {
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
            console.log ("Full screen requested");
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

    #canvas {
        height: 80vh;
        width: 128vh;
    }

    .er-no-touch {
        touch-action: none;
    }

</style>
