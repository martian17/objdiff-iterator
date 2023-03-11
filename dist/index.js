const ARRAY = 0;
const OBJECT = 1;
const OTHER = 2;
const getType = function (obj) {
    if (obj instanceof Array) {
        return ARRAY;
    }
    else if (typeof obj === "object") {
        return OBJECT;
    }
    else {
        return OTHER;
    }
};
const toPath = function (key) {
    if (key.match(/^[A-Za-z_][A-Za-z_0-9]*$/)) {
        return "." + key;
    }
    return `["${key}"]`;
};
;
export const objdiff = function* (o1, o2) {
    const t1 = getType(o1);
    const t2 = getType(o2);
    if (t1 !== t2 || (t1 === OTHER && o1 !== o2)) {
        //different
        yield {
            path: "",
            o1, o2
        };
    }
    else if (t1 === OBJECT) {
        for (let key in o1) {
            if (!(key in o2)) {
                yield {
                    path: toPath(key),
                    o1: o1[key],
                    o2: undefined
                };
            }
            else {
                for (let res of objdiff(o1[key], o2[key])) {
                    res.path = toPath(key) + res.path;
                    yield res;
                }
            }
        }
        for (let key in o2) {
            if (!(key in o1)) {
                yield {
                    path: toPath(key),
                    o1: undefined,
                    o2: o2[key]
                };
            }
        }
    }
    else if (t1 === ARRAY) {
        for (let i = 0; i < o1.length; i++) {
            for (let res of objdiff(o1[i], o2[i])) {
                res.path = `[${i}]` + res.path;
                yield res;
            }
        }
        for (let i = o1.length; i < o2.length; i++) {
            yield {
                path: `[${i}]`,
                o1: undefined,
                o2: o2[i]
            };
        }
    }
    else {
        //console.log("type other and same",o1,o2,t1,t2);
    }
};
;
export const perfdiff = function* (o1, o2) {
    const t1 = getType(o1);
    const t2 = getType(o2);
    if (t1 !== t2 || (t1 === OTHER && o1 !== o2)) {
        //different
        yield {
            path: [],
            o1, o2
        };
    }
    else if (t1 === OBJECT) {
        for (let key in o1) {
            if (!(key in o2)) {
                yield {
                    path: [key],
                    o1: o1[key],
                    o2: undefined
                };
            }
            else {
                if (o1[key] === o2[key])
                    continue;
                for (let res of perfdiff(o1[key], o2[key])) {
                    res.path.push(key);
                    yield res;
                }
            }
        }
        for (let key in o2) {
            if (!(key in o1)) {
                yield {
                    path: [key],
                    o1: undefined,
                    o2: o2[key]
                };
            }
        }
    }
    else if (t1 === ARRAY) {
        for (let i = 0; i < o1.length; i++) {
            if (o1[i] === o2[i])
                continue;
            for (let res of perfdiff(o1[i], o2[i])) {
                res.path.push(i);
                yield res;
            }
        }
        for (let i = o1.length; i < o2.length; i++) {
            yield {
                path: [i],
                o1: undefined,
                o2: o2[i]
            };
        }
    }
    else {
        //console.log("type other and same",o1,o2,t1,t2);
    }
};
export const perfdiff2 = function* (o1, o2) {
    const t1 = getType(o1);
    const t2 = getType(o2);
    if (t1 !== t2 || (t1 === OTHER && o1 !== o2)) {
        //different
        yield {
            path: "",
            o1, o2
        };
    }
    else if (t1 === OBJECT) {
        for (let key in o1) {
            if (!(key in o2)) {
                yield {
                    path: toPath(key),
                    o1: o1[key],
                    o2: undefined
                };
            }
            else {
                if (o1[key] === o2[key])
                    continue;
                for (let res of perfdiff2(o1[key], o2[key])) {
                    res.path = toPath(key) + res.path;
                    yield res;
                }
            }
        }
        for (let key in o2) {
            if (!(key in o1)) {
                yield {
                    path: toPath(key),
                    o1: undefined,
                    o2: o2[key]
                };
            }
        }
    }
    else if (t1 === ARRAY) {
        for (let i = 0; i < o1.length; i++) {
            if (o1[i] === o2[i])
                continue;
            for (let res of perfdiff2(o1[i], o2[i])) {
                res.path = `[${i}]` + res.path;
                yield res;
            }
        }
        for (let i = o1.length; i < o2.length; i++) {
            yield {
                path: `[${i}]`,
                o1: undefined,
                o2: o2[i]
            };
        }
    }
    else {
        //console.log("type other and same",o1,o2,t1,t2);
    }
};
