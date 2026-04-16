import * as v from 'https://addsoupbase.github.io/v4.js'
import preload from 'https://addsoupbase.github.io/webcomponents/cel-runner.js'
const { background, music } = v.id
const { css } = v
let $ = v.default
let ctx = v.getContext('2d', 'cd', 0,0)
if (ctx) {
    let img = $`<picture><source srcset="./media/discs.avif" type="image/avif"><img src="./media/discs.jpg"></picture>`.at(1).valueOf()
    img.onload = () => {
        const sourceDiscSize = 640
        , maxDiscs = 15
        , DESIRED_TILE_SIZE = 40
        , MIN_TILE_SIZE = 20
        , MAX_TILE_SIZE = 40
        music.setCanvasBg('cd')
        music.observe('resize', {
            callback(e) {
                let r = e.contentBoxSize || e.contentRect
                let { canvas } = ctx
                let width = r[0]?.inlineSize || r.width
                let height = r[0]?.blockSize || r.height
                if (!(width && height)) return
                canvas.width = width
                canvas.height = height
                ctx.imageSmoothingQuality = 'high'
                let baseTileSize = DESIRED_TILE_SIZE
                const maxPossible = Math.min(width, height) * 0.3
                if (baseTileSize > maxPossible) baseTileSize = maxPossible
                baseTileSize = Math.min(MAX_TILE_SIZE, Math.max(MIN_TILE_SIZE, baseTileSize))
                let disc = 0
                function drawDisc(index, x, y, w, h) {
                    const srcX = (sourceDiscSize * disc++) % (sourceDiscSize * maxDiscs)
                    ctx.drawImage(img, srcX, 0, sourceDiscSize, sourceDiscSize, x, y, w, h)
                }
                const verticalTileSize = baseTileSize
                    , verticalCount = Math.floor(height / verticalTileSize)
                    , totalVerticalHeight = verticalCount * verticalTileSize
                    , verticalOffsetY = (height - totalVerticalHeight) / 2
                for (let i = 0; i < verticalCount; i++) {
                    const y = verticalOffsetY + i * verticalTileSize
                    drawDisc(i, 0, y, verticalTileSize, verticalTileSize)
                    drawDisc(i, width - verticalTileSize, y, verticalTileSize, verticalTileSize)
                }
                let horizontalCount = Math.floor(width / baseTileSize)
                if (horizontalCount * baseTileSize !== width) 
                    horizontalCount = Math.max(1, horizontalCount - 1)
                const tileW = width / horizontalCount
                , tileH = baseTileSize
                for (let i = 0; i < horizontalCount; i++) {
                    const x = i * tileW
                    drawDisc(i, x, 0, tileW, tileH)
                    drawDisc(i, x, height - tileH, tileW, tileH)
                }
            }
        })
    }
}
/*else {
    // ITS NOT WORKING AND I DONT KNOW WHY ARGHHH
    CSS.registerProperty({
        name: '--cd-image',
        syntax: '<image> | none',
        inherits:false,
        initialValue: 'none'
    })
    // for(let prefix of ['', '-webkit-'])
    music.style.setProperty('--cd-image', `url("./media/discs.jpg")`)
    music.style.background = `paint(cd)`
}*/
preload({
    src: 'media/fish.png',
    x: 4,
    y: 1
},/* {
    src: 'media/octopus.png',
    x: 4,
    y: 1,
}, */{
        src: 'media/manta.png',
        x: 8,
        y: 1
    }, {
    src: 'media/octopus2.png',
    x: 10,
    y: 1
}, {
    src: 'media/school.png',
    x: 14,
    y: 1
})
let isHidden = Reflect.get.bind(this, document, 'hidden', document)
background.delegate({
    animationend(e) {
        if (e.animationName === 'offset') this.purge(true)
    }
})
let imgset  ='image-set(url("./media/jellyfish.avif") type("image/avif"), url("./media/jellyfish.png") type("image/png"))'
css.insertRule(
`.jelly {
    background-image: url("./media/jellyfish.png");
    background-image: -webkit-${imgset};
    background-image: ${imgset};
}`)
!function spawnJellyfish() {
    setTimeout(spawnJellyfish, (Math.random() * 500) + 1000)
    if (isHidden()) return
    $`<div aria-hidden="true" class="jelly obj obj_up" style="left: ${Math.random() * innerWidth}px; filter:hue-rotate(${Math.random() * 360}deg)"></div>`
        .setParent(background)
    // .animFrom('up', { duration: 7000, easing: 'linear', iterations: 1 })
    // .onfinish = kill
}()
function kill() {
    v.Proxify(this.effect.target).purge()
}
let creatures = ['manta', 'octopus2', 'fish', 'school', //'octopus'

]
!function spawnCreature() {
    setTimeout(spawnCreature, (Math.random() * 1000) + 4000)
    if (isHidden()) return
    let creature = creatures[Math.floor(Math.random() * creatures.length)]
    let dir = Math.random() > .5
    let div = $`<div aria-hidden="true" style="animation-direction: ${dir ? 'normal' : 'reverse'};top: ${Math.random() * innerHeight}px;${dir ? 'transform:scaleX(-1)' : ''}" class="obj obj_left creature"><cel-runner dura="80ms" src="media/${creature}.png" class="cr-${creature}"></cel-runner></div>`
    div.setParent(background)
}()