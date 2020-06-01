var a:boolean = true;

let aa : boolean = false;

const AAB : string = "d;asjfjsodpfjpsa";

const AABC : string = "d;asjfjsodpfjps1a";

const Arr:number[] = [1,2,3,4,5];

const Brr:Array<number> = [1,2,3,4,5];

console.log("Arr",Arr,Brr);

function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }else{
        return "";
    }
}

enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

