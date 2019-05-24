var script = document.createElement('script')
var script = document.createElement('script')
script.type = 'text/javascript'
var now = new Date(),
  version = `${now.getDate()}${now.getMonth()}${now.getDate()}${now.getHours()}${now.getMinutes()}`
script.src = `//file.40017.cn/tcservice/common/kaoqin.js?v=${version}`
document.head.appendChild(script)
