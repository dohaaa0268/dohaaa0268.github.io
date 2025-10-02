import $ from 'https://addsoupbase.github.io/yay.js'
import ran from 'https://addsoupbase.github.io/random.js'
import 'https://addsoupbase.github.io/webcomponents/img-sprite.js'
const h = window[Symbol.for('[[HModule]]')]
let { stuff, content, background } = $.id
window.onload = null
content.fadeIn()
function press(a) {
    for (let n of stuff) {
        if (n === a) n.attr._selected = 'true'
        else n.attr._selected = "false"
    }
}

function load() {
    h.safari || content.fadeIn()
    // stuff.attr.inert = false
    press($(document.querySelector(`a[href="${content.contentWindow.location.href.split('/').at(-1)}"]`)))
    // if (this.attr._selected === 'true') return e.preventDefault()
}
stuff.delegate({
    $auxclick() { },
    $contextmenu() { }, // Prevent the 'open in new tab' thing
    click(e) {
        if (this.attr._selected === 'true') e.preventDefault()
        // else stuff.attr.inert = true
    }
})

function spawnJellyFish() {
    setTimeout(spawnJellyFish, ran.range(2000, 2500))
    let jelly = $('<div class="jelly" aria-hidden="true"><img-sprite  rows="1" cols="7" duration="80" width="50" height="50" src="./media/jellyfish.png"></img-sprite></div>', { parent: background })
    jelly.setStyle({
        left: `calc((100vw - 50px) * ${Math.random()})`,
        filter: `hue-rotate(${ran.range(0, 360)}deg)`
    })
    jelly.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(calc(-100vh - 50px))' }], { duration: 7000, iterations: 1, easing: 'linear', fill: 'forwards', composite: 'add' })
    .finished.then(()=>jelly.destroy())
}
h.on(window, {
    _load() {
        spawnJellyFish()
        content.on({
            load,
            error: load
        })
    }
})