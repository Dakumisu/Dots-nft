import Mouse from './Mouse'
import Raf from './Raf'
import Store from './store/Store'

export default new class Sketch {
   constructor() {
      this.canvas = document.querySelector('canvas.main')
      
      this.initialized = false

      this.init()
      this.update()
      this.resize()

      Raf.suscribe('sketch', () => { this.update() })
   }

   init() {
      this.canvas.width = Store.sizes.width * window.devicePixelRatio
      this.canvas.height = Store.sizes.height * window.devicePixelRatio

      this.ctx = this.canvas.getContext('2d')
      // this.ctx.fillStyle = "#eee"
      this.ctx.fillStyle = "#000"
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      
      this.initialized = true
   }
   
   clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.fillStyle = "#eee"
      // this.ctx.fillStyle = "#000"
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
   }

   fade() {
      // this.ctx.fillStyle = "#000"
      this.ctx.fillStyle = "#eee"
      this.ctx.globalAlpha = .1
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.globalAlpha = 1
   }

   resize() {
      window.addEventListener('resize', () => {
         Store.sizes.width = window.innerWidth
         Store.sizes.height = window.innerHeight

         this.canvas.width = Store.sizes.width * window.devicePixelRatio
         this.canvas.height = Store.sizes.height * window.devicePixelRatio
      })
   }

   landmarks() {
      this.ctx.strokeStyle = "#f00"

      // Vertical
      this.ctx.beginPath()
      this.ctx.moveTo(this.canvas.width / 2, 0)
      this.ctx.lineTo(this.canvas.width / 2, this.canvas.height)
      this.ctx.stroke()
      this.ctx.closePath()
      
      // Horizontal
      this.ctx.beginPath()
      this.ctx.moveTo(0, this.canvas.height / 2)
      this.ctx.lineTo(this.canvas.width, this.canvas.height / 2)
      this.ctx.stroke()
      this.ctx.closePath()
   }

   update() {
      if (!this.initialized) return

      // this.fade()
      this.clear()
   }
}