import {objdiff} from "../dist/index.js";

for(let res of objdiff({a:2},{a:3})){
    console.log(res);
}
