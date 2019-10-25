import pub from './public'
class Element{
    constructor(){
        this.area = {
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0
        }
        this.touched = false
        this.visible = true
        this.hasEventBind = false
    }

    render(ctx){
        if(!this.visible)
            return false

        if(!this.hasEventBind){
            this.hasEventBind = true
            this.bindEvent()
        }
        return true
    }

    bindEvent(){

    }
}
let width = pub.screenWidth
let height = pub.screenHeight

//标准单位 736 * 414
let orgWidth = 736
let orgHeight = 414
let rate = height / orgHeight
export function px(value){
    console.log(value * rate)
    return value * rate;
}
/**
 * 绘制图片 options
 * @param src 图片路径
 * @param sw 裁剪宽度
 * @param sh 裁剪高度
 * @param sx 裁剪起始x
 * @param sy 裁剪起始y
 * @param x 图片在画布上的位置x
 * @param y 图片在画布上的位置y
 * @param w 图片显示的宽度
 * @param h 图片显示的高度
 * @param circle 是否显示成圆形
 * @returns {{endY: number, endX: number, startY: number, startX: number}}
 */
export class ImageElement extends Element{
    constructor(options, fn){
        super()
        this.img = wx.createImage()
        this.src = options.src
        this.options = options
        this.loaded = false
        this.img.src = this.src
        this.img.onload = ()=>{
            this.loaded = true
            this.onload()
            if(typeof fn == 'function')
            {
                fn()
            }
        }
    }
    onload(){

    }
    render(ctx){
        if(!super.render(ctx)) return
        //console.log(this.img.width, this.img.height)
        let options = this.options
        this.x = options.x == undefined ? 0: options.x
        this.y = options.y == undefined ? 0: options.y
        this.w = options.w == undefined ? 50: options.w
        this.h = options.h == undefined ? 50: options.h

        this.sw = options.sw == undefined ? this.img.width: options.sw
        this.sh = options.sh == undefined ? this.img.height: options.sh
        this.sx = options.sx == undefined ? 0: options.sx
        this.sy = options.sy == undefined ? 0: options.sy

        console.log(this.x, this.y, this.w, this.h)
        //ctx.save()
        ctx.drawImage(
            this.img,
            this.sx,
            this.sy,
            this.sw,
            this.sh,
            this.x,
            this.y,
            this.w,
            this.h
        )
        //ctx.restore()
    }
}

export class Button extends Element{
    constructor(options){
        super()
        this.text = options.text
        this.x = options.x == undefined ? 0 : options.x
        this.y = options.y == undefined ? 0 : options.y
        this.w = options.w == undefined ? 120 : options.w
        this.h = options.h == undefined ? 30 : options.h
        this.fontSize = options.fontSize == undefined ? 12: options.fontSize
        this.fontColor = options.fontColor == undefined ? '#000': options.fontColor
        this.background = options.background == undefined ? '#fff': options.background
        this.textAlign = options.textAlign == undefined ? 'center': options.textAlign
        this.textBaseline = options.textBaseline == undefined ? 'middle': options.textBaseline
        this.textTop = options.textTop == undefined ? 0: options.textTop
        this.textLeft = options.textLeft == undefined ? 0: options.textLeft
    }
    render(ctx){
        if(!super.render(ctx)) return
        ctx.fillStyle = this.background // 矩形颜色
        ctx.fillRect(this.x, this.y, this.w, this.h)
        if(this.text){
            ctx.fillStyle = this.fontColor
            ctx.font    = this.fontSize + "px Arial"
            ctx.textAlign = this.textAlign
            ctx.textBaseline = this.textBaseline
            ctx.fillText(
                this.text,
                this.x+ (this.textAlign==='center'?this.w/2:0)+this.textLeft,
                this.y+(this.textBaseline==='middle'?this.h/2:0)+this.textTop
            )
        }
    }
}
export class ImageButton extends ImageElement{
    constructor(options, fn) {
        super(options, fn)
        this.text = options.text == undefined ? 'text': options.text
        this.fontSize = options.fontSize == undefined ? 12: options.fontSize
        this.fontColor = options.fontColor == undefined ? '#ffffff': options.fontColor
        this.textAlign = options.textAlign == undefined ? 'center': options.textAlign
        this.textBaseline = options.textBaseline == undefined ? 'middle': options.textBaseline
        this.textTop = options.textTop == undefined ? 0: options.textTop
        this.textLeft = options.textLeft == undefined ? 0: options.textLeft
    }
    render(ctx){
        super.render(ctx)
        ctx.save();
        ctx.fillStyle = this.fontColor
        ctx.font    = this.fontSize + "px Arial"
        ctx.textAlign = this.textAlign
        ctx.textBaseline = this.textBaseline
        ctx.fillText(
            this.text,
            this.x+ (this.textAlign==='center'?this.w/2:0)+this.textLeft,
            this.y+(this.textBaseline==='middle'?this.h/2:0)+this.textTop
        )
        console.log('text',this.text)
        ctx.restore()
    }

}
export class Text extends Element{
    constructor(options){
        super()
        this.text = options.text
        this.x = options.x == undefined ? 0 : options.x
        this.y = options.y == undefined ? 0 : options.y
        this.fontSize = options.fontSize == undefined ? 12: options.fontSize
        this.fontColor = options.fontColor == undefined ? '#000000': options.fontColor
        this.background = options.background
        this.maxWidth   = options.maxWidth===undefined?false:true
    }
    render(ctx){
        if(!super.render(ctx)) return
        ctx.save();
        ctx.fillStyle = this.fontColor
        ctx.textAlign = "left"
        ctx.textBaseline = "top"
        ctx.font = this.fontSize + "px sans-serif"
        ctx.fillText(
            this.text,
            this.x,
            this.y
        )
        ctx.restore()
    }
}
export class Line extends Element{
    /**
     * 分割线
     * @param options
     */
    constructor(options){
        super(options)
        this.x=options.x
        this.y=options.y
        this.ex=options.ex
        this.ey=options.ey
        this.line_width = options.line_width
        this.line_color = options.line_color
    }

    render(ctx){
        //分割线
        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.ex,this.ey);
        ctx.lineWidth = this.line_width;
        ctx.strokeStyle = this.line_color;
        ctx.stroke();
    }
}