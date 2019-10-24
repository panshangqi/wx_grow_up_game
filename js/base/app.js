
export default class App{
    constructor(ctx){
        this.ctx = ctx
        this.pages = []
        this.init()
    }
    init(){
        this.pageIndex = 0
        this.pageName = "-/-"
        console.log('App Init')
    }
    render(){
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        let page = this.pages[this.pageIndex].obj
        page.render(this.ctx)
    }

    /**
     * 注册页面
     */
    registerPage(pageName, pageObject){
        pageObject.name = pageName
        this.pages.push({
            name: pageName,
            obj: pageObject
        })
    }

    /**
     *
     * @param pre
     * @param options {url}
     */
    linkTo(pre, options){
        let pageIndex = 0
        for(let page of this.pages){
            let pageInstance = page.obj
            let pageName = page.name
            if(pageName == options.url){
                this.pageIndex = pageIndex
                pageInstance.init()
                pageInstance.render(this.ctx)
            }
            pageIndex ++
        }
    }
}