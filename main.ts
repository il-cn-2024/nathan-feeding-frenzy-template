namespace SpriteKind {
    export const Hooked = SpriteKind.create()
}
function mainMenu () {
    music.setVolume(20)
    music.play(music.createSong(assets.song`fishingSong`), music.PlaybackMode.LoopingInBackground)
    scene.setBackgroundImage(assets.image`menu`)
    mySprite = sprites.create(assets.image`menuTitle`, SpriteKind.Player)
    game.showLongText("Press A to PLAY!", DialogLayout.Bottom)
    startGame()
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        uncast()
    }
    if (sprite.isHittingTile(CollisionDirection.Left)) {
        casted = 0
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (casted == 0) {
        cast()
    }
})
function startGame () {
    music.stopAllSounds()
    gameStarted = 1
    music.setVolume(5)
    music.play(music.createSong(assets.song`fishingSong`), music.PlaybackMode.LoopingInBackground)
    sprites.destroy(mySprite)
    scene.setBackgroundImage(assets.image`background`)
    tiles.setCurrentTilemap(tilemap`underwater`)
    casted = 0
    hook = sprites.create(assets.image`hook`, SpriteKind.Player)
    hook.setPosition(80, 15)
    controller.moveSprite(hook, 150, 0)
    scene.cameraFollowSprite(hook)
    while (gameStarted == 1) {
        spawnFish()
    }
}
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    sprites.destroy(sprite)
})
function spawnHazard () {
    bomb = sprites.create(assets.image`mine`, SpriteKind.Enemy)
    if (Math.percentChance(50)) {
        tiles.placeOnTile(bomb, tiles.getTileLocation(0, randint(4, 29)))
        bomb.setVelocity(randint(30, 80), 0)
    } else {
        tiles.placeOnTile(bomb, tiles.getTileLocation(15, randint(4, 29)))
        bomb.setVelocity(randint(-30, -80), 0)
    }
}
scene.onHitWall(SpriteKind.Food, function (sprite, location) {
    sprites.destroy(sprite)
})
function cast () {
    casted = 1
    hook.setVelocity(0, 100)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    music.play(music.createSoundEffect(WaveShape.Sine, 200, 600, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    otherSprite.setKind(SpriteKind.Hooked)
    hookFish(otherSprite)
})
function uncast () {
    hook.setVelocity(0, -100)
}
function spawnFish () {
    fish = sprites.create(fishList._pickRandom(), SpriteKind.Food)
    fishImage = fish.image.clone()
    if (Math.percentChance(50)) {
        fishImage.flipX()
        fish.setImage(fishImage)
        fish.setVelocity(50, 50)
        tiles.placeOnTile(fish, tiles.getTileLocation(0, randint(4, 28)))
        fish.setVelocity(randint(50, 100), 0)
    } else {
        tiles.placeOnTile(fish, tiles.getTileLocation(15, randint(4, 28)))
        fish.setVelocity(randint(-50, -100), 0)
    }
    if (Math.percentChance(10)) {
        spawnHazard()
    }
    pause(500)
}
function hookFish (fish: Sprite) {
    while (casted == 0) {
        pause(0.01)
        fish.setPosition(hook.x, hook.x)
    }
    music.play(music.createSoundEffect(WaveShape.Sine, 1, 1356, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(6, 1000)
    animation.runImageAnimation(
    otherSprite,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 4 4 . . . . . . . 
        . . . . . . 4 5 5 4 . . . . . . 
        . . . . . . 2 5 5 2 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . 4 . . . . . 
        . . . . 2 . . . . 4 4 . . . . . 
        . . . . 2 4 . . 4 5 4 . . . . . 
        . . . . . 2 4 d 5 5 4 . . . . . 
        . . . . . 2 5 5 5 5 4 . . . . . 
        . . . . . . 2 5 5 5 5 4 . . . . 
        . . . . . . 2 5 4 2 4 4 . . . . 
        . . . . . . 4 4 . . 2 4 4 . . . 
        . . . . . 4 4 . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . 3 . . . . . . . . . . . 4 . . 
        . 3 3 . . . . . . . . . 4 4 . . 
        . 3 d 3 . . 4 4 . . 4 4 d 4 . . 
        . . 3 5 3 4 5 5 4 4 d d 4 4 . . 
        . . 3 d 5 d 1 1 d 5 5 d 4 4 . . 
        . . 4 5 5 1 1 1 1 5 1 1 5 4 . . 
        . 4 5 5 5 5 1 1 5 1 1 1 d 4 4 . 
        . 4 d 5 1 1 5 5 5 1 1 1 5 5 4 . 
        . 4 4 5 1 1 5 5 5 5 5 d 5 5 4 . 
        . . 4 3 d 5 5 5 d 5 5 d d d 4 . 
        . 4 5 5 d 5 5 5 d d d 5 5 4 . . 
        . 4 5 5 d 3 5 d d 3 d 5 5 4 . . 
        . 4 4 d d 4 d d d 4 3 d d 4 . . 
        . . 4 5 4 4 4 4 4 4 4 4 4 . . . 
        . 4 5 4 . . 4 4 4 . . . 4 4 . . 
        . 4 4 . . . . . . . . . . 4 4 . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . b b . b b b . . . . . 
        . . . . b 1 1 b 1 1 1 b . . . . 
        . . b b 3 1 1 d d 1 d d b b . . 
        . b 1 1 d d b b b b b 1 1 b . . 
        . b 1 1 1 b . . . . . b d d b . 
        . . 3 d d b . . . . . b d 1 1 b 
        . b 1 d 3 . . . . . . . b 1 1 b 
        . b 1 1 b . . . . . . b b 1 d b 
        . b 1 d b . . . . . . b d 3 d b 
        . b b d d b . . . . b d d d b . 
        . b d d d d b . b b 3 d d 3 b . 
        . . b d d 3 3 b d 3 3 b b b . . 
        . . . b b b d d d d d b . . . . 
        . . . . . . b b b b b . . . . . 
        `],
    100,
    false
    )
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
    sprite.setVelocity(0, 0)
    pause(500)
    game.gameOver(false)
})
let fishImage: Image = null
let fish: Sprite = null
let bomb: Sprite = null
let hook: Sprite = null
let casted = 0
let mySprite: Sprite = null
let gameStarted = 0
let fishList: Image[] = []
fishList = [
assets.image`goldfish`,
assets.image`tropicalfish`,
assets.image`clownfish`,
assets.image`greenfish`,
img`
    ................................
    ................................
    ................................
    ................................
    ................................
    ................11..............
    ..............11331.............
    ...........111c99bc1............
    .........11ccc66699c1......1....
    ........1ccc6c6cccb9c1....1b1...
    .......1cc6666666cc6b1...1c91...
    ......1cc6667676766c6b1.1c991...
    .....166663377777766cc1169991...
    ....1c6c66377777777666cc66991...
    ...1ccc666777776667777b3c6991...
    ..1c61d67667dddd77666cccc691....
    .1ccdfbdd76dddddd7777776c6991...
    .1ccdfbdd76ddddddd77666666991...
    .167d1ddd1dddddddd776bc169991...
    .1ddddddd1ddddddd77769c11c991...
    ..1ddddd11ddddddd77669c1.1b91...
    ...11bbd1d1dddddd76699c1..1b1...
    .....1cbdd111ddd76699dc1...1....
    ......11eeedddddcccccc1.........
    ........111cc999111111..........
    ...........11111................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    `,
assets.image`coel`
]
gameStarted = 0
effects.bubbles.startScreenEffect()
mainMenu()
