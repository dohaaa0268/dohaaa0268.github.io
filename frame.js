import $ from 'https://addsoupbase.github.io/yay.js'
const h = window[Symbol.for('[[HModule]]')]
onerror = alert
let me = $(frameElement)
h.compatOn({
    safari: [window, {
        pageswap:hide
    }],
    otherwise: [window, { beforeunload: hide}],
})
// typeof navigation === 'object' && h.on(navigation, {
// navigate: hide
// })
function hide() {
    me.hide(3)
}
