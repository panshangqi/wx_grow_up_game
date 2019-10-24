import myImage from './src/image.js'
import App from './base/app'
import Login from './runtime/login'
import Play from './runtime/play'
let context = canvas.getContext('2d')
export default class Main extends App{
    constructor(){
        super(context)
        this.top = 0
        this.ctx = context
        console.log(canvas.width, canvas.height)
        //this.start()
        //this.init()

        this.userInfo = wx.getStorageSync('userInfo')
        console.log(this.userInfo)
        // wx.checkSession({
        //     success: function(){
        //         console.log('success login')
        //     },
        //     fail: function(){
        //         console.log('unlogin')
        //     },
        //     complete: function(){
        //
        //     }
        // })
        //this.login()

        //this.authorize()

    }
    init(){
        super.init()
        console.log('main init')
        this.registerPage('login', new Login(this, this.ctx))
        this.registerPage('play', new Play(this, this.ctx))
        this.linkTo(undefined, {url: 'login'})
    }
    login(){
        wx.login({
            success: function(res){
                console.log(res)
                if(res.code){
                    // wx.request({
                    //
                    // })
                }
            },
            fail: function(){
                console.log('unlogin')
            },
            complete: function(){

            }
        })
    }


    init1(){
        console.log('init')
        let img = wx.createImage()
        img.src = "images/background.jpg"
        img.width = 1024//canvas.width
        img.height = 778//canvas.height
        img.onload = ()=>{
            console.log('onload')
            context.drawImage(img, 0, 40, img.width, img.height)
            this.createMainArea()
            this.createHandOpt()
        }

    }
    start(){
        console.log("start")
        setInterval(()=>{
            console.log(this.top)
            context.fillRect(0, this.top, 100, 100)
            this.top += 20
        }, 300)
    }
    //创建方块活动区域
    createMainArea(){
        let areaWidth = canvas.width*0.6
        let areaHeight = areaWidth * 2
        let areaLeft = (canvas.width - areaWidth)* 0.5
        let gameCols = 10
        let gameRows = 20
        let blockWidth = areaWidth / gameCols

        this.mainCanvas = wx.createCanvas()
        this.mainCTX = this.mainCanvas.getContext('2d')
        this.mainCTX.fillStyle = '#333333aa'
        this.mainCTX.fillRect(0, 0, areaWidth, areaHeight)

        this.mainCTX.strokeStyle = '#ddd'
        this.mainCTX.lineWidth = 1
        this.mainCTX.strokeRect(0, 0, areaWidth, areaHeight)
        context.drawImage(this.mainCanvas, areaLeft, 50)
    }
    //操作区域
    createHandOpt(){
        let areaWidth = canvas.width * 0.6
        let areaHeight = areaWidth * 2

        let iconWidth = 40
        let top = areaHeight + 100

        //计算四个图片平均分布
        let cell_width = this.screenWidth/4.0
        let left = (cell_width - iconWidth)*0.5

        new myImage("images/left.png", left, top, iconWidth, iconWidth, context, (img) => { })
        new myImage("images/down.png", left + cell_width, top, iconWidth, iconWidth, context, (img) => { })
        new myImage("images/right.png", left + cell_width * 2, top, iconWidth, iconWidth, context, (img) => { })
        new myImage("images/right.png", left + cell_width * 3, top, iconWidth, iconWidth, context, (img) => { })
    }
}