# DOS GAMES
There are 3 dos games installed. They are available at:

* http://localhost:3000/games/dos/digger
* http://localhost:3000/games/dos/dangerous-dave
* http://localhost:3000/games/dos/pac-man

## To run the application locally

* npm run dev - development mode with HMR (auto-reload)

or 

1. `npm build` - to build the app
2. `npm generate` - to generate static pages (games - required)
3. `npm start` - to start the webpack / nuxt server

Take the contents of the /dist folder for deployment.

## Notes
 
1. This is a Vue.js/Nuxt application.
2. The total bundled application size is +/- 100kb (excl games)
3. Switching between games from the same application will use cached assets
4. It's required to generate-pages so you can hit a HTML5 history URL and still be served the correct game.
5. It's also important as the meta tags (viewport, etc) are served directly to the browser on load.

## Developer Notes

1. DOSBox code sits in /pages/games/dos/_game.vue
2. Main menu sits in /pages/index.vue
3. Game files sit in /static/games/dos
4. Game configuration sits in /assets/arcadex/games.js
5. Routes (new game urls need to be registered in nuxt.config.js) - below: 

*see* **/nuxt.config.js**
```javascrit
    generate: {
        routes: ['/games/dos/digger','/games/dos/dangerous-dave','/games/dos/pac-man']
    },
```

## Notes on OCR Score

1. Only DIGGER has been configured.
2. It's not true OCR, it's image matching on each character.
3. The characters (0-9) are in /assets/arcadex/digits.js
4. The config is in /assets/arcadex/games.js
5. Dosbox sends a screenshot to ocr2.js which returns a promise that resolves a score if it sees one in the expected position:

```javascript
    export default {
        methods: {
            // ...
            setupScreenPoll() {
                this.screenPoll = setInterval(() => {
                    ci.screenshot().then((imageData) => {
                        processScreenshot(imageData).then(
                            score => console.log (score) // RECEIVES OCR SCORE HERE
                        );
                    });
                }, this.game.ocrScore.interval)
            }
            // ...
        }
    }
```

## Known bugs

1. IOS Safari: No fullscreen
2. IOS Safari: Cannot disable pinch and zoom
3. Desktop: Widescreen makes canvas extend beyond the top and bottom of screen (RESOLVABLE)
4  Desktop: Digger: Keyboard fire button is F1: F1 on Mac requires fn to be pressed. Another key should be mapped (RESOLVABLE)
   
Cheers!
