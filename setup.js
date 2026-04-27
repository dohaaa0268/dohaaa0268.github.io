    import * as v from 'https://addsoupbase.github.io/v4.js'
    const { paper, undo, color, brushsize } = v.id
    undo.on({
        click() {
            paper.undo()
        }
    })
    color.on({
        change() {
            paper.color = this.value
        }
    })
    brushsize.on({
        change() {
            paper.brushsize = this.value
        }
    })
