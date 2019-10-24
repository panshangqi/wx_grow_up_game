
import Page from '../base/page'
import {ImageElement} from '../base/ui'
export default class PlayPage extends Page{
    constructor(app, ctx, options){
        if(options == undefined){
            options = {}
        }
        options.background = '#c5c4bf'
        options.firstPage = true
        super(app, ctx, options)
        this.ctx = ctx
    }

    init(){
        super.init()
        this.createBackground()
    }
    createBackground(){
        let bg_image = new ImageElement({
            src: 'images/background.jpg',
            sx: 0,
            sy: 0,
            sw: 500,
            sh: 700,
            x: 0,
            y: 0,
            w: window.innerWidth,
            h: window.innerHeight
        }, ()=>{
            bg_image.render(this.ctx)
            this.createMainArea()
            this.createHandOpt()
        })
    }
    //创建方块活动区域
    createMainArea(){
        let areaWidth = window.innerWidth*0.6
        let areaHeight = areaWidth * 2
        let areaLeft = (window.innerWidth - areaWidth)* 0.5
        let gameCols = 10
        let gameRows = 20
        let blockWidth = areaWidth / gameCols

        this.mainCanvas = wx.createCanvas()
        this.mainCTX = this.mainCanvas.getContext('2d')
        this.mainCTX.fillStyle = "rgba(40, 40, 40, 0.3)"
        this.mainCTX.fillRect(0, 0, areaWidth, areaHeight)

        this.mainCTX.strokeStyle = '#ddd'
        this.mainCTX.lineWidth = 2
        this.mainCTX.strokeRect(0, 0, areaWidth, areaHeight)
        this.ctx.drawImage(this.mainCanvas, areaLeft, 50)
    }
    //操作区域
    createHandOpt(){
        let areaWidth = window.innerWidth * 0.6
        let areaHeight = areaWidth * 2

        let iconWidth = 40
        let top = areaHeight + 100

        //计算四个图片平均分布
        let cell_width = window.innerWidth/4.0
        let left = (cell_width - iconWidth)*0.5

        let left_btn = new ImageElement({src: 'images/left.png', x: left, y: top, w: iconWidth, h: iconWidth}, ()=>{
            left_btn.render(this.ctx)
        })
        let down_btn = new ImageElement({src: 'images/down.png', x: left+cell_width, y: top, w: iconWidth, h: iconWidth}, ()=>{
            down_btn.render(this.ctx)
        })
        let right_btn = new ImageElement({src: 'images/right.png', x: left+cell_width*2, y: top, w: iconWidth, h: iconWidth}, ()=>{
            right_btn.render(this.ctx)
        })
        let rotate_btn = new ImageElement({src: 'images/right.png', x: left+cell_width*3, y: top, w: iconWidth, h: iconWidth}, ()=>{
            rotate_btn.render(this.ctx)
        })

    }

}