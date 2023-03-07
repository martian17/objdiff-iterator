export interface Diff {
    path: string;
    o1: any;
    o2: any;
}
export declare const objdiff: (o1: any, o2: any) => Generator<Diff, void, void>;
//# sourceMappingURL=index.d.ts.map