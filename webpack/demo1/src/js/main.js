import sum from "./sum";
import getLength from "./str";
import '../css/index.less'

const result = sum(1, 2, 3, 4, 5)
console.log(`sum result: ${result}`)

const len = getLength('Hello Webpack')
console.log(`len: ${len}`)



