import $ from 'https://addsoupbase.github.io/yay.js'
let { stuff, content } = $.id
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
