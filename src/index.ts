const getType = function(obj:any){
    if(obj instanceof Array){
        return "array";
    }else if(typeof obj === "object"){
        return "object";
    }else{
        return "other";
    }
};

const toPath = function(key:string){
    if(key.match(/^[A-Za-z_][A-Za-z_0-9]*$/)){
        return "."+key;
    }
    return `["${key}"]`;
};

export interface Diff{
    path:string,
    o1:any,
    o2:any
};


export const objdiff = function*(o1:any,o2:any):Generator<Diff,void,void>{
    const t1 = getType(o1);
    const t2 = getType(o2);
    if(t1 !== t2 || (t1 === "other" && o1 !== o2)){
        //different
        yield {
            path:"",
            o1,o2
        };
    }else if(t1 === "object"){
        for(let key in o1){
            if(!(key in o2)){
                yield {
                    path:toPath(key),
                    o1:o1[key],
                    o2:undefined
                };
            }else{
                for(let res of objdiff(o1[key],o2[key])){
                    res.path = toPath(key)+res.path;
                    yield res;
                }
            }
        }
        for(let key in o2){
            if(!(key in o1)){
                yield {
                    path:toPath(key),
                    o1:undefined,
                    o2:o2[key]
                };
            }
        }
    }else if(t1 === "array"){
        for(let i = 0; i < o1.length; i++){
            for(let res of objdiff(o1[i],o2[i])){
                res.path = `[${i}]`+res.path;
                yield res;
            }
        }
        for(let i = o1.length; i < o2.length; i++){
            yield {
                path:`[${i}]`,
                o1:undefined,
                o2:o2[i]
            };
        }
    }else{
        //console.log("type other and same",o1,o2,t1,t2);
    }
};
