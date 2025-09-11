import * as h from 'https://addsoupbase.github.io/handle.js'
import $ from 'https://addsoupbase.github.io/yay.js'
let me = $(frameElement)
h.on(window, {
    beforeunload: hide,

})
typeof navigation === 'object' && h.on(navigation, {
    navigate: hide
})
function hide() {
    me.hide(3)
}