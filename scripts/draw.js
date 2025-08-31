import $ from 'https://addsoupbase.github.io/yay.js'
import 'https://addsoupbase.github.io/webcomponents/paper-canvas.js'
import { on } from 'https://addsoupbase.github.io/handle.js'
let { dragon, } = $.id
on(document, {
    visibilitychange() {
        document.hidden ? dragon.pauseAnims() : dragon.resumeAnims()
    }
})
let { paper, undo, brushsize, submit, form } = $.id
submit.on({
    async _click() {
        form.fadeOut()
        let note = $('<img title="Loading..." alt="mail icon" class="center" src="https://addsoupbase.github.io/cute-emojis/emojis/1313256446267363470.gif">')
        dragon.fadeOut().then(() => {
            form.after = note
            note.animate([{ transform: 'scale(.5, .5)', opacity: 0 }, { transform: '', opacity: 1 }], { duration: 500, easing: 'ease', iterations: 1 })
        })
        try {
            let data = paper.dataURL()
             let a = await fetch(form.attr.$action, {
                method: 'POST',
                body: data,
                mode: 'cors',
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
            if(!a.ok) throw `Error code ${a.status}`
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
        }
        catch (e) {
            prompt('Message could not be sent', e.toString())
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