<template>
    <div ref="gameScreen" id="gameScreen" class="flex flex-row w-full h-full flex-grow items-center justify-center">
        
        <!-- Left Column (Directional Control) -->
        <div id="axLeftColumn" class="flex flex-grow flex-col items-center justify-center" v-if="isTouch">
            <div id="logo"></div>
            <div id="axJoystickContainer" class="bg-red-800 rounded-full pointer-events-none flex justify-center items-center">
                <div id="axJoystick" class="bg-red-800 rounded-full pointer-events-none"></div>
            </div>
        </div>

        <!-- Middle Column (Canvas) -->
        <div id="axMiddleColumn">
            <canvas id="axCanvas" ref="axCanvas"/>
        </div>

        <!-- Right Column (Buttons) -->
        <div id="axRightColumn" class="flex flex-col flex-grow items-center justify-center" v-if="isTouch">
            <div id="ctlButtonFull" class="h-8 mb-5" v-if="isFullscreenAvailable">
                <div class="bg-gray-800 rounded-lg pointer-events-none w-full h-full flex items-center justify-center">Full</div>
            </div>
            <div id="ctlButtonExit" class="h-8 mb-5">
                <div class="bg-gray-800 rounded-lg pointer-events-none w-full h-full flex items-center justify-center">Exit</div>
            </div>
            <div id="ctlButtonB" class="w-16 h-16 mb-5" v-if="game.keys.ctlButtonB">
                <div class="bg-gray-700 rounded-full pointer-events-none w-full h-full flex items-center justify-center">{{game.keys.ctlButtonB.label}}</div>
            </div>
            <div id="ctlButtonA" class="w-16 h-16" v-if="game.keys.ctlButtonA">
                <div class="bg-red-800 rounded-full pointer-events-none w-full h-full flex items-center justify-center">{{game.keys.ctlButtonA.label}}</div>
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
        this.runDosProgram(this.game.path, this.game.commands, this.game.cycles);

        // Prevent swiping to navigate browser on iOS only
        if (this.isIos) {
            const gamescreen = document.getElementById('gameScreen');
            gamescreen.addEventListener('touchstart', (e) => {
                // Is not near edge of view, exit
                if (e.pageX > 20 && e.pageX < window.innerWidth - 20) return;

                // Prevent swipe to navigate gesture
                e.preventDefault();
            });

            const leftcolumn = document.getElementById('axLeftColumn');
            leftcolumn.addEventListener('touchstart', (e) => {
                // Is not near edge of view, exit
                if (e.pageX > 20 && e.pageX < window.innerWidth - 20) return;

                // Prevent swipe to navigate gesture
                e.preventDefault();
            });

            const joystickcontainer = document.getElementById('axJoystickContainer');
            joystickcontainer.addEventListener('touchstart', (e) => {
                // Is not near edge of view, exit
                if (e.pageX > 20 && e.pageX < window.innerWidth - 20) return;

                // Prevent swipe to navigate gesture
                e.preventDefault();
            });
        }
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
                            console.log(id);
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
                //console.log (button, pressed, this.game.keyMapping[button]);
                window.ci.simulateKeyEvent(this.game.keys[button].ascii, pressed)
            }
        },
        exitGame() {
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
                // window.navigator.vibrate(200);
            });
            turnOn.forEach((item) => this.simulateKeyPress(item, true));
        },
        dosReady() {
            this.setupEventListeners();
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
        },
        isFullscreenAvailable: function () {
            return document.documentElement.requestFullscreen;
        },
        isIos() {
            return [
                'iPad Simulator',
                'iPhone Simulator',
                'iPod Simulator',
                'iPad',
                'iPhone',
                'iPod'
            ].includes(navigator.platform)
            // iPad on iOS 13 detection
            || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
        }
    }
}
</script>

<style>
    * {
        -webkit-user-select: none; /* disable selection/Copy of UIWebView */
        -webkit-touch-callout: none; /* disable the IOS popup when long-press on a link */
    }

    body {
        position: fixed;
        height:100%;
        width:100%;
        overflow: hidden;
    }

    #gameScreen {
        background-color: rgb(78, 54, 40);
        touch-action: manipulation;
        background-image: url('../../../static/images/dos-console/wooddark.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: left top;
    }

    #axCanvas {
        background-color: #110000;
        /* height: 70vh; */
        /* width: 116vh; */
        width: 70vw;
        height: calc(70vw / 1.7);
        border-radius: 4px;
    }

    #axLeftColumn {
        pointer-events: none;
        touch-action: manipulation;
        height: 95%;
        width: 32rem;
    }

    #logo {
        width: 3rem;
        height: 3rem;
        background-image: url('../../../static/images/dos-console/logo.jpg');
        background-size: 100% auto;
        background-repeat: no-repeat;
        background-position: left top;
    }

    #axJoystickContainer {
        background-color: rgba(175, 175, 175, 0.3);
        width: 7rem;
        height: 7rem;
        margin-left: 10px;
        margin-top: 80px;
    }

    #axJoystick {
        width: 3.5rem;
        height: 3.5rem;
    }

    #axMiddleColumn {
        display: flex;
        justify-content: center;
        align-items:center;
        height: 95%;
        width: 100%;
        -moz-box-shadow:    inset 0px 2px 18px 6px rgba(0, 0, 0, 0.6);
        -webkit-box-shadow: inset 0px 2px 18px 6px rgba(0, 0, 0, 0.6);
        box-shadow:         inset 0px 2px 18px 6px rgba(0, 0, 0, 0.6);
        border-radius: 6px;
        background-color: rgb(26, 26, 26);
        border: 3px solid gray;
    }

    #axRightColumn {
        pointer-events: none;
        touch-action: manipulation;
        height: 100%;
        width: 18rem;
    }

    #ctlButtonFull {
        pointer-events: all;
        width: 3rem;
        font-size: 13px;
    }

    #ctlButtonExit {
        pointer-events: all;
        width: 3rem;
        font-size: 13px;
    }

    #ctlButtonA {
        pointer-events: all;
    }

    #ctlButtonB {
        pointer-events: all;
        margin-top: 40px;
    }
/*
    *:not(input):not(textarea) {
    }
    -->
    */
</style>