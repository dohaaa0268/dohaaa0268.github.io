import $ from 'https://addsoupbase.github.io/yay.js'
import ran from 'https://addsoupbase.github.io/random.js'
import 'https://addsoupbase.github.io/webcomponents/img-sprite.js'
import * as h from 'https://addsoupbase.github.io/handle.js'
let { stuff, content, background } = $.id
window.onload=null
content.fadeIn()
content.on({
    load(){
        content.fadeIn()
    }
})
stuff.delegate({
    $auxclick(){},
    $contextmenu(){}, // Prevent the 'open in new tab' thing
    click(e) {
        if (this.attr._selected === 'true') return e.preventDefault()
        for(let n of stuff) n.attr._selected = 'false'
        this.attr._selected = 'true'
        content.hide(3)
    }
})
function spawnJellyFish() {
    setTimeout(spawnJellyFish, ran.range(2000, 2500))
    let jelly = $('<div class="jelly" aria-hidden="true"><img-sprite  rows="1" cols="7" duration="80" width="50" height="50" src="./media/jellyfish.png"></img-sprite></div>', {parent:background})
    jelly.setStyle({
        left: `calc((100vw - 50px) * ${Math.random()})`,
        filter :`hue-rotate(${ran.range(0,360)}deg)`
    })
   jelly.animate([{transform:'translateY(0)'},{transform:'translateY(calc(-100vh - 50px))'}], {duration:7000, iterations:1, easing:'linear',fill:'forwards',composite:'add'})
}
h.on(window, {
    load:spawnJellyFish
})