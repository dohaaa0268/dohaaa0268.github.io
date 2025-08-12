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
    $contextmenu(){}, // Prevent the 'open in new tab' thing
    click(e) {
        if (this.attr._checked === 'true') return e.preventDefault()
        for(let n of stuff) n.attr._checked = 'false'
        
        this.attr._checked = 'true'
        // console.log(this)
        content.hide(3)
    }
})
