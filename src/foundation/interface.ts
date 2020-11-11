// Class Wrapper for making values passe by refrence or reactive
export class Ref<T> {
  public _value: T;
  constructor(value: T) {
    this._value = value;
  }

  public get value(): T {
    return this._value;
  }

  public set value(val: T) {
    this._value = val;
  }
}

// Options hold property name as key and different values which
// will be used to draw and hydrate values to Canvas Objects
export abstract class Options<T> {
  public key: string;
  public value: T;

  constructor(key: string, value: T) {
    this.key = key;
    this.value = value;
  }

  // Update the value of Options
  abstract update(value: T): void;

  // Signifies whether they are equal comapring their key and value
  abstract equal(other: Options<T>): boolean;
}

export interface Curvature {
  (context: CanvasRenderingContext2D): CanvasRenderingContext2D;
}

export abstract class ElementInterface {
  public _child?: ElementInterface;
  public _options: Options<any>[];
  public _changed = false as boolean;
  public _curves: Curvature[];

  // Key is unique signature of element used to differentiate between same appearing elements
  public key?: string;
  constructor(config?: {
    child?: ElementInterface;
    curves: Curvature[];
    options?: Options<any>[];
    key?: string;
  }) {
    if (config != undefined) {
      this._child = config.child
      this._options = config.options != undefined ? config.options: [] as Options<any>[];
      this._curves = (config.curves === undefined)? [] as Curvature[] : config.curves;
      this.key = config.key;
      this._changed = true;
    }else{
      this._curves = [] as Curvature[]
      this._options = [] as Options<any>[]
    }
  }

  // Change in the Element used in diffing o reproduce the element
  // Reproduction of Element tree is costly thus only elements observing change will be re-drawn
  // The tree uses BFS to complete the travel, thus the re-production due to change will be atomic
  // even excluding the childrens if they arn't related
  public abstract set change(value: boolean);

  // Set child value and observer the change
  public abstract set child(value: ElementInterface | undefined);

  // append option to options and observing the change
  abstract appendOption(option: Options<any>): void;

  // draw the element on canvas with given context
  abstract draw(context: CanvasRenderingContext2D): void;

  // Append Curve to curvature and set changed to true
  abstract appendCurve(curve: Curvature): void;

  // Perform all the options value with given style in the context
  abstract hydrate(context: CanvasRenderingContext2D): void;

  // Tell whether the ElementInterface is same, comparing key and all options
  // Compare whether the given element is equal
  // Comparable parameters are key and options, curves
  // any change in options will call for change
  abstract equal(other: ElementInterface): boolean;

  public abstract get child(): ElementInterface | undefined;

  abstract get options(): Options<any>[];

  abstract option(key: string): any | null;

  public abstract get curves(): Curvature[];

  public abstract set curves(cur: Curvature[]);
}
