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
        attacks: [attacks.Attacco,attacks.Calcio],
        baseHealth: 25,
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
        attacks: [attacks.Frustata],
        baseHealth: 25,
    },
}