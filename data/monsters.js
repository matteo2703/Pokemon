const monsters = {
    Emby:{
        position:{
            x: 280,
            y: 325
        },
        image: {
            src: './img/fireySprite.png'
        },
        frames:{
            max: 4,
            hold: 30
        },
        animate: true,
        name: 'Emby',
        attacks: [attacks.Attacco,attacks.Incendio],
        level: 1,
        baseHealth: 20,
    },
    Bubbly:{
        position:{
            x: 280,
            y: 325
        },
        image: {
            src: './img/bubbleSprite.png'
        },
        frames:{
            max: 4,
            hold: 30
        },
        animate: true,
        name: 'Bubbly',
        attacks: [attacks.Attacco,attacks.Spruzzo],
        level: 1,
        baseHealth: 20,
    },
    Leafy:{
        position:{
            x: 280,
            y: 325
        },
        image: {
            src: './img/grassySprite.png'
        },
        frames:{
            max: 4,
            hold: 30
        },
        animate: true,
        name: 'Leafy',
        attacks: [attacks.Attacco,attacks.Frustata],
        level: 1,
        baseHealth: 20,
    },
    Scinty:{
        position:{
            x: 280,
            y: 325
        },
        image: {
            src: './img/elettroSprite.png'
        },
        frames:{
            max: 4,
            hold: 30
        },
        animate: true,
        name: 'Scinty',
        attacks: [attacks.Attacco,attacks.Scossa],
        level: 1,
        baseHealth: 20,
    },
    Draggle:{
        position:{
            x: 800,
            y: 100
        },
        image: {
            src: './img/draggleSprite.png'
        },
        frames:{
            max: 4,
            hold: 30
        },
        animate: true,
        isEnemy: true,
        name: 'Draggle',
        attacks: [attacks.Attacco, attacks.Calcio],
        level: 1,
        baseHealth: 20,
    }
}