import { Curvature, ElementInterface, Options } from "../foundation/interface";

export default class Element extends ElementInterface {
    public set change(value: boolean) {
        this._changed = value
    }
    public set child(value: ElementInterface | undefined) {
        this._child = value
    }
    public get child(): ElementInterface | undefined {
        return this._child
    }
    appendOption(option: Options<any>): void {
        if(this._options === undefined) this._options = [] as Options<any>[]
        this._options.push(option)
    }
    draw(context: CanvasRenderingContext2D): void {
        let currentContext = context
        for(let curve of this._curves) {
            currentContext = curve(currentContext)
        }
    }
    appendCurve(curve: Curvature): void {
        this._curves.push(curve)
    }
    hydrate(context: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }
    equal(other: ElementInterface): boolean {
        return this.key === other.key && this._curves == other._curves && this._child == other._child
    }
    get options(): Options<any>[] {
        return this._options
    }
    option(key: string) {
        for(let option of this._options){
            if (option.key === key){
                return option
            }
        }
        return undefined
    }
    public get curves(): Curvature[] {
        return this._curves
    }
    public set curves(cur: Curvature[]) {
        this._curves = cur
    }
}
