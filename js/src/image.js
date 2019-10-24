
export default class Image{
  constructor(src, x, y, width, height, ctx, fn){
    this.img = wx.createImage()
    this.x = x
    this.y = y
    this.w = width
    this.h = height
    this.img.src = src
    this.ctx = ctx
    this.img.onload = ()=>{
      if(typeof fn === 'function'){
        this.drawToCanvas(this.ctx)
      }
    }
  }
  drawToCanvas(ctx){
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
  }
}