export const games = {
    "digger": {
        title:'Digger',
        path: '/games/dos/digger.zip',
        commands: ['-c', 'DIGGER.COM'],
        cycles:400,
        directions: 4,
        keys: {
            'up':{ascii:38},
            'down':{ascii:40},
            'left':{ascii:37},
            'right':{ascii:39},
            'ctlButtonA':{ascii:112, label:'Fire'},
            'ctlButtonB':{ascii:32, label:'Start'}
        }
    },
    "pac-man": {
        title:'Pac Man',
        path: '/games/dos/PACEM11.zip',
        commands: ['-c', 'PACEM.EXE'],
        cycles:3500,
        directions: 4,
        keys: {
            'up':{ascii:38},
            'down':{ascii:40},
            'left':{ascii:37},
            'right':{ascii:39},
            'ctlButtonA':{ascii:13, label:'Go'},
        }
    },

    "dangerous-dave": {
        // Requires selection on the first screen (could automate)
        // Requires mapping of keys (x: speed (,):up (.):invert (/):down (b):bomb (h):home
        // Requires auto game restart
        title:'Dangerous Dave',
        path: '/games/dos/dangerousdave.zip',
        commands: ['cd DANGER~1', 'DAVE.EXE'],
        cycles:700,
        directions: 8,
        keys: {
            'up':{ascii:38},
            'down':{ascii:40},
            'left':{ascii:37},
            'right':{ascii:39},
            'ctlButtonA':{ascii:17, label:'Fire'},
            'ctlButtonB':{ascii:13, label:'Enter'},
        }
    },

    "bubble-bobble": {
        // Requires figuring out how the keys work
        title:'Bubble Bobble',
        path: '/games/dos/bubble-bobble.zip',
        commands: ['-c', 'CD BUBBLE~1', '-c', 'BUBBLE.EXE'],
        cycles:400,
        directions: 4,
        keys: {
            'up':38,
            'down':40,
            'left':37,
            'right':39,
            'ctlButtonA':112,
            'ctlButtonB':32
        }
    },
    "sopwith": {
        // Requires selection on the first screen (could automate)
        // Requires mapping of keys (x: speed (,):up (.):invert (/):down (b):bomb (h):home
        // Requires auto game restart
        title:'Bubble Bobble',
        path: '/games/dos/sopwith.zip',
        commands: '',
        exec: 'SOPWITH1.EXE',
        opts: '-c',
        cycles:400,
        directions: 4,
        keys: {
            'up':38,
            'down':40,
            'left':37,
            'right':39,
            'ctlButtonA':112,
            'ctlButtonB':32
        }

    }
}
