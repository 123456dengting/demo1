//方案1

function Per(name, age) {
  this.name = name;
  this.age = age
  //私有函数
  var updateName = function (name) {
    this.name = name
  }
  this.setName = function (name) {
    updateName.apply(this, [name])
  }
}



//方案2
class Foo {
  #a;
  #b;

  constructor() {
    this.#a = 1;
    this.#b = 2;
  }

  #sum = () => {
    console.log('#sum1')
    return this.#a + this.#b
  }

  printSum() {
    return this.#sum()
  }

}

let foo = new Foo;
foo.printSum();



