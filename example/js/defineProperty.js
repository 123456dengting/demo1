var inner = {
  first: 111
}

var test = {
  name: inner
}

Object.defineProperty(test, 'name', {
  get(){
    console.log('name-get')
    return inner
  },
  set(name){
    console.log('name-set')
    
  }
})

let name = test.name
console.log('name1', name)
test.name = '12'
console.log('name2', name)















