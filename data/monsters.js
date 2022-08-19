const monsters = {
    Ditto:{
        image: {
            src: './img/pokemonFronte/dittoFronte.png'
        },
        sprites:{
            front: './img/pokemonFronte/dittoFronte.png',
            back: './img/pokemonRetro/dittoRetro.png',
        },
        frames:{
            max: 1,
            hold: 30
        },
        animate: true,
        name: 'Ditto',
        attacks: [attacks.Attacco,attacks.Pugno,attacks.Morso,attacks.Calcio],
        attacksFromLevel: [1,2,3,5],
        baseHealth: 25,
        type: 'Normale',
        strong: '',
        weak: '',
        id: 1,

    },
    Bulbasaur:{
        image: {
            src: './img/pokemonFronte/bulbasaurFronte.png'
        },
        sprites:{
            front: './img/pokemonFronte/bulbasaurFronte.png',
            back: './img/pokemonRetro/bulbasaurRetro.png',
        },
        frames:{
            max: 1,
            hold: 30
        },
        animate: true,
        name: 'Bulbasaur',
        attacks: [attacks.Pugno,attacks.Attacco,attacks.Calcio,attacks.Frustata],
        attacksFromLevel: [1,1,3,5],
        evolutionLevel: 20,
        baseHealth: 25,
        type: 'Erba',
        strong: 'Acqua',
        weak: 'Fuoco',
        id: 2,
    },
    Ivysaur:{
        image: {
            src: './img/pokemonFronte/ivysaurFronte.png'
        },
        sprites:{
            front: './img/pokemonFronte/ivysaurFronte.png',
            back: './img/pokemonRetro/ivysaurRetro.png',
        },
        frames:{
            max: 1,
            hold: 30
        },
        animate: true,
        name: 'Ivysaur',
        attacks: [attacks.Pugno,attacks.Attacco,attacks.Calcio,attacks.Frustata],
        attacksFromLevel: [1,1,3,5],
        evolutionLevel: 50,
        baseHealth: 25,
        type: 'Erba',
        level: 20,
        strong: 'Acqua',
        weak: 'Fuoco',
        id: 3,
    },
    Venusaur:{
        image: {
            src: './img/pokemonFronte/venusaurFronte.png'
        },
        sprites:{
            front: './img/pokemonFronte/venusaurFronte.png',
            back: './img/pokemonRetro/venusaurRetro.png',
        },
        frames:{
            max: 1,
            hold: 30
        },
        animate: true,
        name: 'Venusaur',
        attacks: [attacks.Pugno,attacks.Attacco,attacks.Calcio,attacks.Frustata],
        attacksFromLevel: [1,1,3,5],
        baseHealth: 25,
        type: 'Erba',
        level: 50,
        strong: 'Acqua',
        weak: 'Fuoco',
        id: 4,
    },
    Squirtle:{
        image: {
            src: './img/pokemonFronte/squirtleFronte.png'
        },
        sprites:{
            front: './img/pokemonFronte/squirtleFronte.png',
            back: './img/pokemonRetro/squirtleRetro.png',
        },
        frames:{
            max: 1,
            hold: 30
        },
        animate: true,
        name: 'Squirtle',
        attacks: [attacks.Attacco,attacks.Pugno,attacks.Calcio,attacks.Spruzzo],
        attacksFromLevel: [1,1,3,5],
        evolutionLevel: 20,
        baseHealth: 25,
        type: 'Acqua',
        strong: 'Fuoco',
        weak: 'Erba',
        id: 5,
    },
    Wartortle:{
        image: {
            src: './img/pokemonFronte/wartortleFronte.png'
        },
        sprites:{
            front: './img/pokemonFronte/wartortleFronte.png',
            back: './img/pokemonRetro/wartortleRetro.png',
        },
        frames:{
            max: 1,
            hold: 30
        },
        animate: true,
        name: 'Wartortle',
        attacks: [attacks.Attacco,attacks.Pugno,attacks.Calcio,attacks.Spruzzo],
        attacksFromLevel: [1,1,3,5],
        evolutionLevel: 50,
        baseHealth: 25,
        type: 'Acqua',
        level: 20,
        strong: 'Fuoco',
        weak: 'Erba',
        id: 6,
    },
    Blastoise:{
        image: {
            src: './img/pokemonFronte/blastoiseFronte.png'
        },
        sprites:{
            front: './img/pokemonFronte/blastoiseFronte.png',
            back: './img/pokemonRetro/blastoiseRetro.png',
        },
        frames:{
            max: 1,
            hold: 30
        },
        animate: true,
        name: 'Blastoise',
        attacks: [attacks.Attacco,attacks.Pugno,attacks.Calcio,attacks.Spruzzo],
        attacksFromLevel: [1,1,3,5],
        baseHealth: 25,
        type: 'Acqua',
        level: 50,
        strong: 'Fuoco',
        weak: 'Erba',
        id: 7,
    },
    Charmander:{
        image: {
            src: './img/pokemonFronte/charmanderFronte.png'
        },
        sprites:{
            front: './img/pokemonFronte/charmanderFronte.png',
            back: './img/pokemonRetro/charmanderRetro.png',
        },
        frames:{
            max: 1,
            hold: 30
        },
        animate: true,
        name: 'Charmander',
        attacks: [attacks.Attacco,attacks.Pugno,attacks.Calcio,attacks.Incendio],
        attacksFromLevel: [1,1,3,5],
        evolutionLevel: 20,
        baseHealth: 25,
        type: 'Fuoco',
        strong: 'Erba',
        weak: 'Acqua',
        id: 8,
    },
    Charmeleon:{
        image: {
            src: './img/pokemonFronte/charmeleonFronte.png'
        },
        sprites:{
            front: './img/pokemonFronte/charmeleonFronte.png',
            back: './img/pokemonRetro/charmeleonRetro.png',
        },
        frames:{
            max: 1,
            hold: 30
        },
        animate: true,
        name: 'Charmeleon',
        attacks: [attacks.Attacco,attacks.Pugno,attacks.Calcio,attacks.Incendio],
        attacksFromLevel: [1,1,3,5],
        evolutionLevel: 50,
        baseHealth: 25,
        type: 'Fuoco',
        level: 20,
        strong: 'Erba',
        weak: 'Acqua',
        id: 9,
    },
    Charizard:{
        image: {
            src: './img/pokemonFronte/charizardFronte.png'
        },
        sprites:{
            front: './img/pokemonFronte/charizardFronte.png',
            back: './img/pokemonRetro/charizardRetro.png',
        },
        frames:{
            max: 1,
            hold: 30
        },
        animate: true,
        name: 'Charizard',
        attacks: [attacks.Attacco,attacks.Pugno,attacks.Calcio,attacks.Incendio],
        attacksFromLevel: [1,1,3,5],
        baseHealth: 25,
        type: 'Fuoco',
        level: 50,
        strong: 'Erba',
        weak: 'Acqua',
        id: 10,
    },
    
}