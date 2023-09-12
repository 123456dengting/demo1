'use strict';

var lodash = require('lodash');

function get () {
    return "aaa"
}

function hello (){
    let a = get();
    console.log("111111-a", a);
    let c  = lodash.get({a: 1}, "a");
    console.log("111111-c", c);
    return sum;

}

hello();


const world = 'world';

exports.world = world;
