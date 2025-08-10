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
    click() {
        content.hide(3)
    }
})