<template>
    <section class="relative">
        <div class="fixed w-full h-full bg-black"></div>
        <div id="background" class="fixed w-full h-full opacity-50 z-10"></div>
        <div ref="gameScreen" id="gameScreen" class="fixed flex flex-row w-full h-full flex-grow items-center justify-center z-20">
            <!-- Left Column (Directional Control) -->
            <div class="flex flex-col items-center justify-center" v-if="isTouch">
                <div class="relative flex w-32 h-32 items-center justify-center">
                    <img class="absolute w-24 h-24" src="/images/dos-console/JoystickSurround.svg">
                    <img class="absolute w-32 h-32" src="/images/dos-console/Joystick.svg">
                </div>
            </div>

            <!-- Middle Column (Canvas) -->
            <div class="flex items-center justify-center text-white">
                <canvas id="axCanvas" ref="axCanvas" class="p-2"/>
            </div>

            <!-- Right Column (Buttons) -->
            <div class="flex flex-col flex-grow items-center justify-center" v-if="isTouch">
                <div id="ctlButtonFull" class="w-16 h-8 mb-5 pointer-events-none">
                    <div class="bg-black rounded-lg pointer-events-none w-full h-full flex items-center justify-center text-gray-500">Full</div>
                </div>
                <div id="ctlButtonExit" class="w-16 h-8 mb-5 pointer-events-none">
                    <div class="bg-black rounded-lg pointer-events-none w-full h-full flex items-center justify-center text-gray-500">Exit</div>
                </div>
                <img id="ctlButtonA" src="/images/dos-console/BTN-A.svg" class="w-24 h-24 pointer-events-none" v-if="game.keys.ctlButtonA">
                <img id="ctlButtonB" src="/images/dos-console/BTN-B.svg" class="w-24 h-24 pointer-events-none" v-if="game.keys.ctlButtonB">

            </div>
        </div>
    </section>
</template>

<script>

import {games} from "assets/arcadex/games.js";
import {setupOcr, processScreenshot} from "assets/arcadex/ocr2.js";

export default {
    name: "game.vue",
    data() {
        return {
            directionStart: {
                x: null,
                y: null,
                identifier: null
            },
            lastDirection: [],
            buttonsPressed: [],
        }
    },
    mounted() {
        if (this.game.ocrScore) {
            let startX = this.game.ocrScore.scoreX
            let startY = this.game.ocrScore.scoreY
            let charWidth = this.game.ocrScore.charWidth
            let charHeight = this.game.ocrScore.charHeight
            let charSpacing = this.game.ocrScore.charSpacing
            let numChars = this.game.ocrScore.numChars;
            let referenceChars = this.game.ocrScore.referenceChars;
            setupOcr(startX, startY, charWidth, charHeight, charSpacing, numChars, referenceChars);
        }

        this.runDosProgram(this.game.path, this.game.commands, this.game.cycles)
    },
    methods: {
        setupEventListeners() {
            document.removeEventListener('touchstart', this.touchListener, false);
            document.removeEventListener('touchend', this.touchListener, false);
            document.removeEventListener('touchmove', this.touchListener, false);

            document.addEventListener('touchstart', this.touchListener);
            document.addEventListener('touchend', this.touchListener);
            document.addEventListener('touchmove', this.touchListener);
        },
        touchListener(event) {

            if (event.type === 'touchstart') {
                event.changedTouches.forEach((starting) => {
                    if (starting.clientX < 200) {
                        this.directionStart.x = starting.clientX;
                        this.directionStart.y = starting.clientY;
                        this.directionStart.identifier = starting.identifier;
                    } else {
                        let id = document.elementFromPoint(starting.clientX, starting.clientY).getAttribute('id');
                        if (id && id.startsWith("ctl")) {
                            this.simulateKeyPress(id, true);
                            this.buttonsPressed.push({identifier:starting.identifier, id:id, x:starting.clientX, y:starting.clientY});
                        }
                    }
                });
            } else if (event.type === 'touchend') {
                event.changedTouches.forEach((ending) => {
                    if (ending.identifier === this.directionStart.identifier) {
                        this.directionStart.x = null;
                        this.directionStart.y = null;
                        this.directionStart.identifier = null;
                        if (this.lastDirection.length > 0) {
                            this.processDirectionChange(this.lastDirection, [])
                        }
                        this.lastDirection = [];
                    } else {
                        let released = this.buttonsPressed.find(item => item.identifier === ending.identifier)
                        if (released) {
                            this.simulateKeyPress(released.id, false)
                            this.buttonsPressed = this.buttonsPressed.filter(item => item.identifier !== ending.identifier)
                        }
                    }
                })
            } else if (event.type === 'touchmove') {
                event.changedTouches.forEach((moving) => {
                    if (moving.clientX < 200) {
                        let control = []
                        let dx = moving.clientX - this.directionStart.x;
                        let dy = moving.clientY - this.directionStart.y;
                        if (dx === 0 && dy === 0) return
                        let r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
                        let angle = this.radToDeg(Math.asin(dy/r)) + 90
                        if (dx < 0) angle = (180 - angle) + 180

                        if (this.game.directions === 4) {
                            if (angle >= 315 || angle < 45) control=['up']
                            else if (angle >= 45 && angle < 135) control=['right']
                            else if (angle >= 135 && angle < 225) control = ['down']
                            else if (angle >= 225 && angle < 315) control = ['left']
                            else {
                                log.error ('unknown angle ' + angle);
                            }
                        } else if (this.game.directions === 8) {

                            if (angle >= 338 || angle < 23) control = ['up']
                            else if (angle >= 23 && angle < 68) control = ['up', 'right']
                            else if (angle >= 68 && angle < 113) control = ['right']
                            else if (angle >= 113 && angle < 158) control = ['down', 'right']
                            else if (angle >= 158 && angle < 203) control = ['down']
                            else if (angle >= 203 && angle < 248) control = ['down', 'left']
                            else if (angle >= 248 && angle < 293) control = ['left']
                            else if (angle >= 293 && angle < 338) control = ['up', 'left']
                            else {
                                console.error ('unknown angle '+ angle);
                            }
                        } else {
                            console.error('directions need to be 4 or 8')
                        }

                        this.processDirectionChange(this.lastDirection, control)
                        this.lastDirection = control;

                    }
                });
            }
        },
        simulateKeyPress(button, pressed) {
            console.log (button, pressed)
            if (button === 'ctlButtonFull') {
                if (!pressed) {
                    this.fullscreenPressed()
                    console.log('Full Screen Button Pressed');
                }
            } else if (button === 'ctlButtonExit') {
                console.log('Exit Button Pressed');
                this.exitGame();
            }
            else {
                window.ci.simulateKeyEvent(this.game.keys[button].ascii, pressed)
            }
        },
        exitGame() {
            window.clearInterval(this.screenPoll);
            window.ci.exit();
            this.$router.push('/')
        },
        fullscreenPressed() {
            if (document.fullscreenElement) {
                document.exitFullscreen()
            } else {
                this.$refs.gameScreen.requestFullscreen()
            }
        },
        radToDeg(rad) {
            return Math.round(rad * 180 / Math.PI);
        },
        processDirectionChange(was, is) {
            let turnOff = was.filter(w => is.indexOf(w) === -1)
            let turnOn = is.filter(i => was.indexOf(i) === -1)
            turnOff.forEach((item) => {
                this.simulateKeyPress(item, false);
                window.navigator.vibrate(200);
            });
            turnOn.forEach((item) => this.simulateKeyPress(item, true));
        },
        dosReady() {
            this.setupEventListeners();
            if (this.game.ocrScore) {
                this.setupScreenPoll()
            }
        },
        setupScreenPoll() {
            this.screenPoll = setInterval(() => {
                ci.screenshot().then((imageData) => {
                    processScreenshot(imageData).then(score => console.log (score));

                })
            }, this.game.ocrScore.interval)
        },
        runDosProgram (zipPath, commands, cycles) {
            console.log (zipPath, commands, cycles)
            let self = this;
            Dos(this.$refs.axCanvas, {
                wdosboxUrl: '/js/vendor/dosbox/wdosbox.js',
                cycles: cycles
            }).ready(function (fs, main) {
                fs.extract(zipPath).then(
                    () => main(commands).then(
                        (ci) => {
                            window.Module = ci.dos;
                            window.ci = ci;
                            self.dosReady();
                        }
                    )
                )
            });
        }
    },
    computed: {
        isTouch: function () {
            return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
        },
        game: function() {
            return games[this.$route.params.game]
        }
    }
}
</script>

<style>

    #axKnob {

    }

    #axBase {

    }

    #background {
        background-image:url('/images/dos-console/LeftPanel_wide.svg');
        background-size: cover;
    }

    #axCanvas {
        background-color: #110000;
        height: calc((100vw - 220px) / 1.6);
        width: calc(100vw - 220px);
    }

    *:not(input):not(textarea) {
      -webkit-user-select: none; /* disable selection/Copy of UIWebView */
      -webkit-touch-callout: none; /* disable the IOS popup when long-press on a link */
    }
</style>
