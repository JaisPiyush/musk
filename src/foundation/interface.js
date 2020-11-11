// Class Wrapper for making values passe by refrence or reactive
export class Ref {
    constructor(value) {
        this._value = value;
    }
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
    }
}
// Options hold property name as key and different values which
// will be used to draw and hydrate values to Canvas Objects
export class Options {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
export class ElementInterface {
    constructor(config) {
        this._changed = false;
        if (config != undefined) {
            this._child = config.child;
            this._options = config.options != undefined ? config.options : [];
            this._curves = (config.curves === undefined) ? [] : config.curves;
            this.key = config.key;
            this._changed = true;
        }
        else {
            this._curves = [];
            this._options = [];
        }
    }
}
