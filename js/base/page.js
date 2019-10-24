import {ImageElement, Button} from "./ui";

/**
 * 游戏页面类
 **/

export default class Page{
    constructor(app, ctx, options){
        this.app = app
        this.ctx = ctx
        this.options = options
        this.elements = []
        this.background = options.background //页面默认背景色
        this.firstPage = options.firstPage
    }

    /**
     * 页面初始化,用作组件的创建
     */
    init(){
        this.createBackButton()
    }
    /**
    * 创建回退按钮
     * */
    createBackButton(){
        if(this.firstPage){
            return
        }
        let back_btn = new ImageElement({
            src: 'images/back_btn.png',
            sx: 0,
            sy: 0,
            sw: 140,
            sh: 140,
            x: 10,
            y: 10,
            w: 30,
            h: 30
        })
        this.elements.push(back_btn)
        back_btn.onClick = () => {

        }
    }

    /**
     * 页面渲染
     */
    render(ctx){
        console.log(this.background)
        ctx.clearRect(0,0,window.innerWidth, window.innerHeight)
        ctx.fillStyle = this.background // 矩形颜色
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
        this.elements.forEach(function(element){
            element.render(ctx)
        })
    }
}