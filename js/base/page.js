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
        this.images = []
        this.background = options.background //页面默认背景色
        this.firstPage = options.firstPage
        this.loadcount = 0
    }

    /**
     * 页面初始化,用作组件的创建
     */
    init(){
        this.elements = []
        this.loadcount = 0
        this.images = []
    }
    onImageDidMount(){

    }
    /**
     * 页面渲染
     */
    render(ctx){
        //console.log(this.background)
        ctx.clearRect(0,0,window.screenWidth, window.screenHeight)
        ctx.fillStyle = this.background // 矩形颜色
        ctx.fillRect(0, 0, window.screenWidth, window.screenHeight)
        this.elements.forEach(function(element){
            element.render(ctx)
        })
    }

    /**
     * 图片资源加载队列 params new ImageElement({})
     */
    addImage(imgObj){
        this.elements.push(imgObj)
        this.images.push(imgObj)
        imgObj.onload = ()=>{
            console.log('add image loaded')
            this.loadcount ++
            if(this.images.length == this.loadcount){
                this.onImageDidMount()
            }
        }
    }
    addElement(ele){
        this.elements.push(ele)
    }
}