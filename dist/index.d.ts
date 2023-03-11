export interface Diff {
    path: string;
    o1: any;
    o2: any;
}
export declare const objdiff: (o1: any, o2: any) => Generator<Diff, void, void>;
export interface Diffp {
    path: (string | number)[];
    o1: any;
    o2: any;
}
export declare const perfdiff: (o1: any, o2: any) => Generator<Diffp, void, void>;
export declare const perfdiff2: (o1: any, o2: any) => Generator<Diff, void, void>;
//# sourceMappingURL=index.d.ts.map