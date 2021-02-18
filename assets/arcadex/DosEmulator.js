/**
 * @author Mark van Wyk
 * (c) Emerge Gaming - 2021
 */
export class DosEmulator {

    /**
     * Sets up the dosbox emulator
     * @param dosBoxUrl the url of the DOSBox JavaScript's installation wdosbox.js file (/js/vendor/dosbox/wdosbox.js)
     * @param canvas DOM reference to a canvas object
     */
    constructor(dosBoxUrl, canvas) {
        this.dosBoxUrl = dosBoxUrl; /* path in ArcadeX Rebuild is: /js/vendor/dosbox/wdosbox.js */
        this.canvas = canvas
    }

    setReadyListener(readyListener) {
        this.readyListener = readyListener;
    }

    run(zipPath, exec, opts, cycles) {
        let self = this;
        Dos(this.canvas, {
            wdosboxUrl: this.dosBoxUrl,
            cycles: cycles
        }).ready(function (fs, main){
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
}
