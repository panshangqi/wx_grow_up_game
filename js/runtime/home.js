import {ImageElement, Text, ImageButton,Button,px} from "../base/ui";
import Page from '../base/page'
import pub from '../base/public'
export default class HomePage extends Page{
    constructor(app, ctx, options){
        if(options == undefined){
            options = {}
        }
        options.background = '#87ceeb'
        options.firstPage = true
        super(app, ctx, options)
        this.ctx = ctx
        this.login()
        console.log(canvas.width, canvas.height)
        this.loginButton = null
    }
    init(){
        super.init()
        this.createLayout()
        this.authorize()
    }
    onImageDidMount(){
        console.log('图片预加载完成')
        this.render(this.ctx)
    }
    /**
     * 微信授权
     */
    authorize(){
        //必须是在用户已经授权的情况下调用
        wx.getUserInfo({
            success: (res) => {
                console.log('已授权')
                console.log(res)
                if(res.userInfo){
                    this.loginButton.image = res.userInfo.avatarUrl
                    let nickname = new Text({
                        fontColor: '#222',
                        fontSize: 12,
                        text: res.userInfo.nickName,
                        x: px(110),
                        y: px(28)
                    })
                    nickname.render(this.ctx)
                }
            },
            fail: (res) => {
                console.log('未授权')
            }
        })

        let btnWidth = 200
        let btnTop = window.innerHeight * 0.7
        let btnLeft = (window.innerWidth - btnWidth)*0.5

        this.loginButton = wx.createUserInfoButton({
            type: 'image',
            text: '使用微信账号登录',
            image: 'images/unlogin_user.jpg',
            style: {
                left: px(30),
                top: px(21),
                width: px(36),
                height: px(36),
                // backgroundColor: '#07c160',
                // color: '#ffffff',
                // textAlign: 'center',
                // fontSize: 16,
                borderRadius: 4
            }
        })

        this.loginButton.onTap((res) => {
            console.log('用户信息获取')
            console.log(res)
            //this.login()
            if(res.userInfo && res.userInfo.avatarUrl){
                this.loginButton.image = res.userInfo.avatarUrl
            }
        })

    }
    /**
     * 检测微信是否授权
     */
    login(){
        wx.login({
            success: function(res){
                console.log(res);
                if(res.code){
                    // wx.request({
                    //     url: 'http://mikan.17zuoye.net/game/wechat/code2Session',
                    //     data: {
                    //         js_code: res.code
                    //     },
                    //     success:function (result) {
                    //         console.log(result)
                    //     },
                    //     fail:function (err) {
                    //         console.log(err)
                    //     }
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

    /**
     * 界面布局
     */
    async createLayout(){
        let bottom = window.innerHeight - 70
        //背景
        let bg_image = new ImageElement({
            src: 'images/main_background.png',
            x: 0,
            y: 0,
            w: pub.screenWidth,
            h: pub.screenHeight
        })
        this.addImage(bg_image)
        //头像信息unlogin_user
        let user_image = new ImageElement({
            src: 'images/user_box.png',
            x: px(20),
            y: px(5),
            w: px(200),
            h: px(70)
        })
        this.addImage(user_image)
        //宠物列表页
        let pets_button = new ImageButton({
            src: 'images/button_react_1.png',
            x: px(20),
            y: bottom - 20,
            w: px(130),
            h: px(70),
            text: '宠物列表',
            fontSize: 30
        })
        this.addImage(pets_button)

        //宠物列表页
        let s_button = new Button({
            x: px(220),
            y: bottom - 20,
            w: px(130),
            h: px(70),
            text: '寻宝',
            fontSize: 30
        })
        this.addElement(s_button)
    }
}