import * as v from 'https://addsoupbase.github.io/v4.js'
import preload from 'https://addsoupbase.github.io/webcomponents/cel-runner.js'
const { background } = v.id
const { css } = v
let $ = v.default
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
let format = await new Promise(resolve => {
    let n = new Image
    n.src = `data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=`
    n.onload = () => resolve('.avif')
    n.onerror = () => resolve('.png')
})
let isHidden = Reflect.get.bind(this, document, 'hidden', document)
background.delegate({
    animationend(e) {
        if (e.animationName === 'offset') this.purge(true)
    }
})
css.registerCSSRaw(`.jelly{background-image: url(./media/jellyfish${format})}`)
!function spawnJellyfish() {
    setTimeout(spawnJellyfish, (Math.random() * 500) + 1000)
    if (isHidden()) return
    let jelly = $`<div aria-hidden="true" class="jelly obj obj_up" style="left: ${Math.random() * innerWidth}px; filter:hue-rotate(${Math.random() * 360}deg)"></div>`
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