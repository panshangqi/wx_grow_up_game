import './js/libs/weapp-adapter'
import './js/libs/symbol'
import pub from './js/base/public'

canvas.width = pub.screenWidth
canvas.height = pub.screenHeight

import Main from './js/main'
//
//
let isloaded = false
let game = new Main()

wx.onDeviceOrientationChange(function (e) {
    console.log('x',e)
    if(e.value == 'landscape'){

    }
})

wx.onShow((e)=>{
    console.log('game show',canvas.width,canvas.height)
    setTimeout(()=>{
        game.onShow()
    },1000)
})

wx.onHide((e)=>{
    console.log('game hide')
})

// wx.exitMiniProgram({
//     success:function () {
//         console.log('退出小游戏')
//     },
//     fail: function () {
//
//     }
// })

