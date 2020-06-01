

/*
一 git基本命令
二 原生js
三 css
四 vue vuex
五 react redux-saga
六 websocket
七 http/https 返回码
八 webpack process.env
九 Protobufjs
十 Nodejs






*/

/**
 * ES6 继承
 */
class Ajax {
  constructor(type, url) {
    this.type = type
    this.url = url
  }


  //静态方法和属性需要用类名调用
  static getDate(){
    return new Date()
  }

  getType(){
    return  this.type
  }
}

class Post extends Ajax {
  constructor(type, url) {
    super(type)
    this.url = url
    
  }
}

let posts = new Post('postsss', '132ssss')

console.log('Ajax-type', posts.getType())
console.log('Ajax-date', Post.getDate())