import { ElementInterface } from "../foundation/interface.js";
export default class Element extends ElementInterface {
    set change(value) {
        this._changed = value;
    }
    set child(value) {
        this._child = value;
    }
    get child() {
        return this._child;
    }
    appendOption(option) {
        if (this._options === undefined)
            this._options = [];
        this._options.push(option);
    }
    draw(context) {
        let currentContext = context;
        for (let curve of this._curves) {
            currentContext = curve(currentContext);
        }
    }
    appendCurve(curve) {
        this._curves.push(curve);
    }
    hydrate(context) {
        throw new Error("Method not implemented.");
    }
    equal(other) {
        return this.key === other.key && this._curves == other._curves && this._child == other._child;
    }
    get options() {
        return this._options;
    }
    option(key) {
        for (let option of this._options) {
            if (option.key === key) {
                return option;
            }
        }
        return undefined;
    }
    get curves() {
        return this._curves;
    }
    set curves(cur) {
        this._curves = cur;
    }
}
