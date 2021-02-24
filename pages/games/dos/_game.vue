<template>
    <div class="flex flex-row w-full h-screen flex-grow items-center justify-center">

        <!-- Left Column (Directional Control) -->
        <div class="flex flex-grow flex-col items-center justify-center" v-if="isTouch">
            <div class="w-32 h-32 bg-blue-800 rounded-full pointer-events-none flex justify-center items-center">
                <div class="bg-blue-700 rounded-full pointer-events-none w-10 h-10"></div>
            </div>
        </div>

        <!-- Middle Column (Canvas) -->
        <div class="flex items-center justify-center">
            <canvas id="axCanvas" ref="axCanvas"/>
        </div>

        <!-- Right Column (Buttons) -->
        <div class="flex flex-col flex-grow items-center justify-center" v-if="isTouch">
            <div id="ctlButtonFull" class="w-16 h-8 mb-5">
                <div class="bg-gray-800 rounded-lg pointer-events-none w-full h-full flex items-center justify-center">Full</div>
            </div>
            <div id="ctlButtonExit" class="w-16 h-8 mb-5">
                <div class="bg-gray-800 rounded-lg pointer-events-none w-full h-full flex items-center justify-center">Exit</div>
            </div>
            <div id="ctlButton3" class="w-16 h-16 mb-5 mt-10">
                <div class="bg-gray-700 rounded-full pointer-events-none w-full h-full flex items-center justify-center">Space</div>
            </div>
            <div id="ctlButton4" class="w-16 h-16">
                <div class="bg-red-800 rounded-full pointer-events-none w-full h-full flex items-center justify-center">Fire</div>
            </div>
        </div>
    </div>
</template>

<script>

import {games} from "assets/arcadex/games.js";

export default {
    name: "game.vue",
    data() {
        return {
            game : {
                directions: 8
            },
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
        this.setupEventListeners();
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
//                            console.log ("Direction Touch Ended for " + this.lastDirection)
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
                            //let dirs = [338, 23, 68, 113, 158, 203, 248, 293, 338]
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

                        // if (control.join(',') !== this.lastDirection.join(',')) {
                        //     if (this.lastDirection.length !== 0) {
                        //         console.log ("Releasing last direction " + this.lastDirection.join(","));
                        //     }
                        //     console.log("Initiating direction " + control.join(","))
                        // }

                        this.lastDirection = control;

                    }
                });
            }
        },
        simulateKeyPress(button, pressed) {
            console.log (button, pressed);
        },
        radToDeg(rad) {
            return Math.round(rad * 180 / Math.PI);
        },
        processDirectionChange(was, is) {
            let turnOff = was.filter(w => is.indexOf(w) === -1)
            let turnOn = is.filter(i => was.indexOf(i) === -1)
            if (turnOff.length > 0 ) console.log ("Turning off " + turnOff);
            if (turnOn.length > 0 ) console.log ("Turning on " + turnOn);

        },
        runDosProgram (zipPath, exec, opts, cycles) {
            let self = this;
            Dos(this.canvas, {
                wdosboxUrl: this.dosBoxUrl,
                cycles: cycles
            }).ready(function (fs, main) {
                fs.extract(zipPath).then(
                    () => main([opts, exec]).then(
                        (ci) => {
                            if (self.readyListener) {
                                self.readyListener(ci)
                            }
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
        }
    }
}
</script>

<style scoped>
    #axCanvas {
        background-color: #110000;
        height: 85vh;
        width: 136vh;
    }

    *:not(input):not(textarea) {
      -webkit-user-select: none; /* disable selection/Copy of UIWebView */
      -webkit-touch-callout: none; /* disable the IOS popup when long-press on a link */
    }
</style>
