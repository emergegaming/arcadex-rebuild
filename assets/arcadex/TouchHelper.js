/**
 * @author Mark van Wyk
 * (c) Emerge Gaming - 2021
 */
export class TouchHelper {

    /**
     * Touch Events
     * @param element the D-Pad element (usually a square DIV decorated as something more fun)
     */
    constructor (element) {
        let bounds = element.getBoundingClientRect();
        this.left = bounds.left;
        this.top = bounds.top;
        this.width = bounds.right - bounds.left;
        this.height = bounds.bottom - bounds.top;
        this.direction = 'none';
        this.lastDirection = undefined;
        this.button = 'up'
        this.lastButton = undefined

        this.directionalKeyMapping = {
            'up':38,
            'down':40,
            'left':37,
            'right':39,
        }
    }

    /**
     * Tells this class that a control surface (usually a square DIV was touched)
     * @param event the original event that happened
     */
    directionTouched(event) {
        if (event.touches && event.touches[0]) {
            let x = event.touches[0].clientX;
            let y = event.touches[0].clientY;
            let pctX = Math.round((x - this.left) / this.width * 100) - 50;
            let pctY = Math.round((y - this.top) / this.height * 100) - 50;
            if (pctX < 0 && Math.abs(pctX) > Math.abs(pctY)) this.direction = 'left'; else
            if (pctX > 0 && Math.abs(pctX) > Math.abs(pctY)) this.direction = 'right'; else
            if (pctY < 0 && Math.abs(pctX) < Math.abs(pctY)) this.direction = 'up'; else
            if (pctY > 0 && Math.abs(pctX) < Math.abs(pctY)) this.direction = 'down'; else
                this.direction = null;
        } else {
            this.direction = null;
        }

        if (this.keyEventTarget && this.direction !== this.lastDirection) {
            if (this.lastDirection) {
                this.keyEventTarget(this.directionalKeyMapping[this.lastDirection], false);
            }
            if (this.direction) {
                this.keyEventTarget(this.directionalKeyMapping[this.direction], true);
            }
        }
        this.lastDirection = this.direction;

    }

    buttonTouched(event) {
        if (event.touches && event.touches[0]) {
            this.button = 'down'
        } else {
            this.button = 'up'
        }

        if (this.keyEventTarget && this.button !== this.lastButton) {
            if (this.lastButton && this.lastButton === 'down') this.keyEventTarget(this.asciiValue, false);
            if (this.button === 'down') this.keyEventTarget(this.asciiValue, true);
        }

        this.lastButton = this.button;
    }

    simulateKeyboardEvents(target, asciiValue) {
        this.keyEventTarget = target;
        this.asciiValue = asciiValue;
    }



}
