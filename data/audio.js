const audio = {
    Map: new Howl({
        src: './sounds/map.wav',
        html5: true,
        volume: 0.1,
    }),
    initBattle: new Howl({
        src: './sounds/initBattle.wav',
        html5: true,
        volume: 0.1,
    }),
    battle: new Howl({
        src: './sounds/battle.mp3',
        html5: true,
        volume: 0.1,
    }),
    attaccoFisico: new Howl({
        src: './sounds/tackleHit.wav',
        html5: true,
        volume: 0.1,
    }),
    attaccoFuoco: new Howl({
        src: './sounds/fireballHit.wav',
        html5: true,
        volume: 0.1,
    }),
    initAttaccoFuoco: new Howl({
        src: './sounds/initFireball.wav',
        html5: true,
        volume: 0.1,
    }),
    vittoria: new Howl({
        src: './sounds/victory.wav',
        html5: true,
        volume: 0.1,
    })
}