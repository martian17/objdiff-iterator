import {objdiff} from "../dist/index.js";
const obj1 = {
    id:234,
    bar:{
        baz:2,
        bar:3
    },
    arr:[1,2]
};
const obj2 = {
    id:53,
    bar:{
        baz:5,
        boo:10
    },
    arr:[1,3,5]
};
for(let result of objdiff(obj1,obj2)){
    console.log(result);
}
