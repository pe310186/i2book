<template>
  <div class="s-canvas">
    <canvas id="s-canvas" :width="contentWidth" :height="contentHeight"></canvas>
  </div>
</template>
<script>
  export default{
    name: 'SIdentify',
    props: {
      identifyCode: {
        type: String,
        default: '1234'
      },
      fontSizeMin: {
        type: Number,
        default: 25
      },
      fontSizeMax: {
        type: Number,
        default: 35
      },
      backgroundColorMin: {
        type: Number,
        default: 200
      },
      backgroundColorMax: {
        type: Number,
        default: 220
      },
      dotColorMin: {
        type: Number,
        default: 60
      },
      dotColorMax: {
        type: Number,
        default: 120
      },
      contentWidth: {
        type: Number,
        default: 116
      },
      contentHeight: {
        type: Number,
        default: 55
      }
    },
    methods: {
      randNum (min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      randColor (min, max) {
        let r = this.randNum(min, max)
        let g = this.randNum(min, max)
        let b = this.randNum(min, max)
        return 'rgb(' + r + ',' + g + ',' + b + ')'
      },
      drawPic () {
        let canvas = document.getElementById('s-canvas')
        let ctx = canvas.getContext('2d')
        ctx.textBaseline = 'bottom'
        ctx.fillStyle = this.randColor(this.backgroundColorMin, this.backgroundColorMax)
        ctx.fillRect(0, 0, this.contentWidth, this.contentHeight)
        for (let i = 0; i < this.identifyCode.length; i++) {
          this.drawText(ctx, this.identifyCode[i], i)
        }
        this.drawLine(ctx)
        this.drawDot(ctx)
      },
      drawText (ctx, txt, i) {
        ctx.fillStyle = this.randColor(50, 160)
        ctx.font = this.randNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei'
        let x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1))
        let y = this.randNum(this.fontSizeMax, this.contentHeight - 5)
        var deg = this.randNum(-30, 30)
        ctx.translate(x, y)
        ctx.rotate(deg * Math.PI / 180)
        ctx.fillText(txt, 0, 0)
        ctx.rotate(-deg * Math.PI / 180)
        ctx.translate(-x, -y)
      },
      drawLine (ctx) {
        for (let i = 0; i < 4; i++) {
          ctx.strokeStyle = this.randColor(100, 200)
          ctx.beginPath()
          ctx.moveTo(this.randNum(0, this.contentWidth), this.randNum(0, this.contentHeight))
          ctx.lineTo(this.randNum(0, this.contentWidth), this.randNum(0, this.contentHeight))
          ctx.stroke()
        }
      },
      drawDot (ctx) {
        for (let i = 0; i < 30; i++) {
          ctx.fillStyle = this.randColor(0, 255)
          ctx.beginPath()
          ctx.arc(this.randNum(0, this.contentWidth), this.randNum(0, this.contentHeight), 1, 0, 2 * Math.PI)
          ctx.fill()
        }
      }
    },
    watch: {
      identifyCode () {
        this.drawPic()
      }
    },
    mounted () {
      this.drawPic()
    }
  }
</script>