/**
 * @author Mark van Wyk
 * (c) Emerge Gaming - 2021
 */
export class ScreenModeHelper {

    /**
     * Sets up event listeners and does initial check
     * @param windowRef pass in a window object reference
     * @param fullScreenElement pass in the HTMLElement that will be the root object of fullscreen mode
     */


    constructor(windowRef, fullScreenElement) {
        this.windowRef = windowRef;
        this.fullScreenElement = fullScreenElement;

        try {
            windowRef.removeEventListener('resize', this.checkNow)
        } finally {
            windowRef.addEventListener('resize', this.checkNow.bind(this))
        }
    }

    setOrientationListener(orientationListener) {
        this.orientationListener = orientationListener;
    }
    setFullScreenListener(fullScreenListener) {
        this.fullScreenListener = fullScreenListener;
    }

    checkNow() {
        this.checkFullScreen(this);
        this.checkLandscape(this);
    }

    checkLandscape() {
        if (this.windowRef.innerWidth && this.windowRef.innerHeight) {
            if (this.orientationListener) {
                this.orientationListener(this.windowRef.innerWidth > this.windowRef.innerHeight ? 'landscape' : 'portrait');
            }
        }
    }

    checkFullScreen() {
        if (this.fullScreenListener) {
            this.fullScreenListener(this.windowRef.outerHeight === this.windowRef.screen.height || this.windowRef.document.fullscreenElement);
        }
    }
    setFullScreen() {
        if (this.fullScreenElement.webkitRequestFullscreen) {
            this.fullScreenElement.webkitRequestFullscreen(); // Safari
        } else {
            this.fullScreenElement.requestFullscreen();
        }
    }

    exitFullScreen() {
        if (this.windowRef.document.webkitExitFullscreen) {
            this.windowRef.document.webkitExitFullscreen(); // Safari
        } else {
            this.windowRef.document.exitFullscreen();
        }
    }
}
