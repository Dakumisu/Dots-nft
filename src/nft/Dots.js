import Raf from '../js/Raf';
import Sketch from '../js/Sketch';
import Store from '../js/store/Store';
import { clamp, map, SimpleNoise1D, smoothstep } from '../js/utils';
import SimplexNoise from '../js/utils/simplex_noise';

const random = require('fast-random');

const perlinNoise = new SimpleNoise1D()
const simplexNoise = new SimplexNoise()
const twoPi = Math.PI * 2

const patternSize = 64
const patternAlpha = 25
class Dots {
   constructor(opt) {
      this.ctx = Sketch.ctx
      this.canvas = Sketch.canvas

      this.coords = {
         x: 0,
         y: 0
      }

      this.count = opt.dotCount
      this.totalCount = this.count * opt.columnCount
      this.defaultSize = 3 // min 3 | max 10
      this.offset = 22

      this.seed = opt.seed || 69
      this.seedRandom = 0

      this.dataDot = []

      this.initialized = true

      this.getDotsData()
      this.getRandomSeed()
      this.initGrain()
   }

   getRandomSeed() {
      this.seedRandom = random(this.seed);
   }

   getProgress(value) {
      let progress = map(value, 0, this.count, 0, 1)
      // progress = smoothstep(.0, .75, progress)
      return progress
   }

   getDotsData() {
      let x = -this.count / 2
      let y = 0
      let columnProgress = 0

      for (let i = 0; i < this.totalCount; i++) {
         if (i % this.count == 0) {
            x += this.offset
            y = 0
            this.coords.y = 0
            columnProgress = 0
         }
         y = 10

         columnProgress ++
         const currentProgress = this.getProgress(columnProgress)

         const size = (this.defaultSize + ((this.defaultSize / 2) * currentProgress)) + ((Math.abs(simplexNoise.noise2D(this.coords.y, y)) * (8 + this.seedRandom)) * currentProgress)
         this.coords.y -= y + (size * 2) + ((Math.random() * size * 2) * currentProgress)

         this.dataDot.push({
            x: x,
            y: this.coords.y,
            size: size
         })
      }
   }

   grid() {
      for (let i = 0; i < this.dataDot.length; i++) {
         const x = this.dataDot[i].x
         const y = this.dataDot[i].y
         const size = this.dataDot[i].size
         this.dot(x, y, size)
      }
   }

   dot(x, y, size) {
      this.ctx.save()

      this.ctx.translate(this.canvas.width / 2 - (55 + this.offset * (this.count / 2)), this.canvas.height - 100)

      this.ctx.beginPath()
      this.ctx.fillStyle = "#2c2c2c"
      this.ctx.arc(x, y, size, 0, twoPi, true)
      this.ctx.fill()
      this.ctx.closePath()

      this.ctx.restore()
   }

   initGrain() {
      this.patternCanvas = document.createElement('canvas');
      this.patternCanvas.width = patternSize;
      this.patternCanvas.height = patternSize;
      this.patternCtx = this.patternCanvas.getContext('2d');
      this.patternData = this.patternCtx.createImageData(patternSize, patternSize);
      this.patternPixelDataLength = patternSize * patternSize * 4

      // this.graininItialized = true
   }

   grain() {
      for (var i = 0; i < this.patternPixelDataLength; i += 4) {
         const value = (Math.random() * 255) | 0;
         
         this.patternData.data[i    ] = value;
         this.patternData.data[i + 1] = value;
         this.patternData.data[i + 2] = value;
         this.patternData.data[i + 3] = patternAlpha;
      }
      
      this.patternCtx.putImageData(this.patternData, 0, 0);

      this.ctx.fillStyle = this.patternCtx.createPattern(this.patternCanvas, 'repeat');
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
   }

   update() {
      if (!this.initialized) return

      this.grid()
      this.grain()
   }
}

export { Dots }