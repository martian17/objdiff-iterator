# Object Diff Iterator
## Motivation
There exists another object diffing library called `deep-object-diff`, but the output is difficult to process in some use cases due to it being consisting of nested objects. This library aims to simplify the comarison by wrapping the logic around a generator function, in turn exposing a simpler iterator API.

## Example
```ts
import {objdiff} from "objdiff-iterator";
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
```
Output
```js
{ path: '.id', o1: 234, o2: 53 }
{ path: '.bar.baz', o1: 2, o2: 5 }
{ path: '.bar.bar', o1: 3, o2: undefined }
{ path: '.bar.boo', o1: undefined, o2: 10 }
{ path: '.arr[1]', o1: 2, o2: 3 }
{ path: '.arr[2]', o1: undefined, o2: 5 }
```

# API
## objdiff: (obj1:any,obj2:any)=>Generator\<Diff,void,void\>
Accepts any objects that needs to be compared. Returns an generator that yields `Diff` objects for every difference found.

## interface Diff
`yield` value of `objdiff`.
```ts
interface Diff {
    path: string,
    o1: any,
    o2: any
};
```
### Diff.path: string
A JS path to the target location in the object.  
It can either contain member access operators, or square brackets containing string keys.  
examples:
`'.bar[1].baz'`
`'.bar["123baz"]'`

### Diff.o1
Content of the path in the first obejct

### Diff.o2
Content of the path in the second obejct




