import {get as _get} from "lodash";


function get () {
    return "aaa"
}

function hello (){
    let a = get();
    console.log("111111-a", a);
    let c  = _get({a: 1}, "a");
    console.log("111111-c", c);
    return sum;

}



export default hello;