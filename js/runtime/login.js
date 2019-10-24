
import Page from '../base/page'
import {ImageElement} from '../base/ui'
export default class LoginPage extends Page{
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
        let sw = 250
        let sh = 250
        let winW = window.innerWidth*0.7
        let winL = window.innerWidth*0.15
        let winH = winW/sw * sh
        let bg_image = new ImageElement({
            src: 'images/login_bg.png',
            sx: 0,
            sy: 0,
            sw,
            sh,
            x: winL,
            y: window.innerHeight*0.2,
            w: winW,
            h: winH
        }, ()=>{
            bg_image.render(this.ctx)
        })
        this.authorize()
        // 必须是在用户已经授权的情况下调用
        wx.getUserInfo({
            success: (res) => {
                console.log('用户信息获取')
                console.log(res)
            }
        })
    }

    /**
     * 微信登录
     */
    login(){
        wx.login({
            success: function(res){
                console.log(res)
                if(res.code){
                    wx.request({
                        url: 'http://mikan.17zuoye.net/game/wechat/code2Session',
                        data: {
                            js_code: res.code
                        },
                        success:function (result) {
                            console.log(result)
                        },
                        fail:function (err) {
                            console.log(err)
                        }
                    })
                }
            },
            fail: function(){
                console.log('unlogin')
            },
            complete: function(){

            }
        })
    }
    /**
     * 微信授权
     */
    authorize(){
        console.log(window.innerWidth, window.innerHeight)
        let btnWidth = 200
        let btnTop = window.innerHeight * 0.7
        let btnLeft = (window.innerWidth - btnWidth)*0.5

        let button = wx.createUserInfoButton({
            type: 'text',
            text: '使用微信账号登录',
            style: {
                left: btnLeft,
                top: btnTop,
                width: btnWidth,
                height: 40,
                lineHeight: 40,
                backgroundColor: '#07c160',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 4
            }
        })
        button.onTap((res) => {
            console.log('用户信息获取')
            console.log(res)
            this.login()
        })
    }
}