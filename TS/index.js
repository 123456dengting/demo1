"use strict";
var a = true;
let aa = false;
const AAB = "d;asjfjsodpfjpsa";
const AABC = "d;asjfjsodpfjps1a";
const Arr = [1, 2, 3, 4, 5];
const Brr = [1, 2, 3, 4, 5];
console.log("Arr", Arr, Brr);
function reverse(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    }
    else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
    else {
        return "";
    }
}
var Days;
(function (Days) {
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
;
console.log("Days", Days, Days[0], Days["Sun"]);
