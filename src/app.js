import './main.scss'

import Raf from './js/Raf'
import { Dots } from './nft'

const dots = new Dots({
    dotCount: 40,
    columnCount: 45
})

Raf.suscribe('update', () => { update() })

function update() {
    dots.update()
}