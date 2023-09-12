const recast = require('recast')

function abc(a, b){
    return a + b
}

console.log(recast.print(abc))