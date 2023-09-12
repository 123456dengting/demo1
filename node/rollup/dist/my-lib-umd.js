(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash')) :
    typeof define === 'function' && define.amd ? define(['exports', 'lodash'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.hello = {}, global.lodash));
})(this, (function (exports, lodash) { 'use strict';

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

}));
