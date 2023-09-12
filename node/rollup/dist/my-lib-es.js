import { get as get$1 } from 'lodash';

function get () {
    return "aaa"
}

function hello (){
    let a = get();
    console.log("111111-a", a);
    let c  = get$1({a: 1}, "a");
    console.log("111111-c", c);
    return sum;

}

hello();


const world = 'world';

export { world };
