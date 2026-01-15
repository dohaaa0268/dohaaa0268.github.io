  import * as v from 'https://addsoupbase.github.io/v4.js'
    const { background } = v.id
    const { css } = v
    let format = await new Promise(resolve => {
        let n = new Image
        n.src = `data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=`
        n.onload = () => resolve('.avif')
        n.onerror = () => resolve('.png')
    })
    css.registerCSSRaw(`.jelly{background-image: url(./media/jellyfish${format})}`)
    !function spawnJellyfish() {
        setTimeout(spawnJellyfish, (Math.random() * 500) + 1000)
        let jelly = v.esc`<div aria-hidden="true" class="jelly" style="left: ${Math.random() * innerHeight}px; filter:hue-rotate(${Math.random() * 360}deg)"></div>`
            .setParent(background)
            .animFrom('toTop', { duration: 7000, easing: 'linear', iterations: 1 })
            .onfinish = kill
    }()
    function kill() {
        v.Proxify(this.effect.target).purge()
    }
