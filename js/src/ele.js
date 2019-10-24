export default class Block{
  constructor(type, x, y, width, height){
    this.type = type
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.src = "images/green.jpg"
  }

  createType(type){
    if(type == 0) //凸字形
    {
      let img = wx.createImage()
      img.src = this.src
      img.width = 40
      img.height = 40

      return [
        {
          x: 0,
          y: 0,

        }
      ]
    }
  }
}