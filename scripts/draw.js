import $ from 'https://addsoupbase.github.io/yay.js'
import 'https://addsoupbase.github.io/webcomponents/paper-canvas.js'
import { on } from 'https://addsoupbase.github.io/handle.js'
let { dragon, } = $.id
on(document, {
    visibilitychange() {
        document.hidden ? dragon.pauseAnims() : dragon.resumeAnims()
    }
})
let drew = false
let { paper, undo, brushsize, submit, form, restore } = $.id
let content = $(top.document.getElementById('content'))
let old = localStorage.drawing
paper.on({
    wheel({ deltaY }) {
        deltaY = -Math.sign(deltaY) * 2
        paper.attr.brushsize = parseFloat(brushsize.value = +brushsize.value + deltaY) || 1
    },
    _pointerdown() {
        drew = true
    }
})
if (old) {
    let n = new Image
    n.src = old
    on(n, {
        _load() {
            restore.show(3)
            restore.on({
                _click() {
                    paper.canvas.getContext('2d').drawImage(n, 0, 0)
                    localStorage.removeItem('drawing')
                    this.destroy()
                }
            })
        }
    })
}
submit.on({
    async _click() {
        form.fadeOut()
        let note = $('<img title="Loading..." alt="mail icon" class="center" src="https://addsoupbase.github.io/cute-emojis/emojis/1313256446267363470.gif">')
        dragon.fadeOut().then(() => {
            form.after = note
            note.animate([{ transform: 'scale(.5, .5)', opacity: 0 }, { transform: '', opacity: 1 }], { duration: 500, easing: 'ease', iterations: 1 })
        })
        let data = paper.dataURL()
        try {
            let a = await fetch('https://dohaaa0268.deno.dev', {
                method: 'POST',
                body: data,
                mode: 'cors',
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
            if (!a.ok) throw `Error code ${a.status}`
            await note.animate([{ transform: '' }, { transform: 'translateX(300px)' }], { delay: 1000, iterations: 1, duration: 500, easing: 'ease-in', fill: 'forwards' }).finished
            let yours = $(`<section>
                <div id="ty">
                <img src="https://addsoupbase.github.io/cute-emojis/emojis/1265962788443127869.png" alt="D">
                <img src="https://addsoupbase.github.io/cute-emojis/emojis/1265963725475676221.png" alt="O">
                <img src="https://addsoupbase.github.io/cute-emojis/emojis/1265963084305006692.png" alt="H">
                <img src="https://addsoupbase.github.io/cute-emojis/emojis/1265962622805610559.png" alt="A">
                </div>
                <h2>Sketch Received!!</h2>
                </section>`)
            note.replace(yours)
            yours.fadeIn()
            localStorage.removeItem('drawing')
        }
        catch (e) {
            localStorage.drawing = data
            prompt('Sketch could not be sent, you may restore it later.', e.toString())
        }
        finally {
            drew = false
        }
    }
})
$.id.color.on({
    change() {
        paper.attr.color = this.value
    }
})
brushsize.on({
    change() {
        paper.attr.brushsize = parseFloat(this.value) || 1
    }
})
undo.on({
    click() {
        paper.undo()
    }
})
function canSend(req) {
    if (!req?.ok) {
        paper.parent.parent.replace($("<strong>Can't send drawings right now. Try again later</strong>"))
        dragon.src = 'https://addsoupbase.github.io/cute-emojis/emojis/58497-gummydragon-35.gif'
        dragon.cancelAnims()
    }
}
fetch('https://dohaaa0268.deno.dev', { method: 'HEAD' }).then(canSend, canSend)
let drawButton = $(top.document.getElementById('drawbutton'))
origin !== 'http://localhost:3000' && on(window, {
    beforeunload(n) {
        if (drew) {
            content.show(3)
            drawButton.click()
            n.returnValue = !n.preventDefault()
        }
    }
}, new AbortController)