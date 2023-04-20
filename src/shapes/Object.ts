import RenderService from '../services/RenderService';
import { ObjectOption, Vector2D } from '../types';
import EventEmitter from '../utils/eventEmitter';
import { Matrix2D } from '../utils/math2D';

export default class CanvasObject extends EventEmitter {
  public fill: string = '';
  public stroke: string = '';
  public strokeWidth: number = 0;
  public bbox: Vector2D[] = [];
  public width: number = 0;
  public height: number = 0;
  public x: number = 0;
  public y: number = 0;
  public scaleX = 1;
  public scaleY = 1;
  public rotation = 0;
  public transform = new Matrix2D();
  public parent: CanvasObject | null = null;
  public renderService: RenderService | null = null;
  public selectable = true;

  private dirty = true;

  constructor(options: ObjectOption) {
    super();
    this.x = options.x || 0;
    this.y = options.y || 0;
    if (options.fill) {
      this.fill = options.fill;
    }
    if (options.scaleX) {
      this.scaleX = options.scaleX;
    }
    if (options.scaleY) {
      this.scaleY = options.scaleY;
    }
    if (options.rotation) {
      this.rotation = options.rotation;
    }
  }

  public getWidth() {
    return this.width;
  }

  public getHeight() {
    return this.height;
  }

  public setAttrs(attrs: Partial<ObjectOption>) {
    this.dirty = true;
    let keys = Object.keys(attrs) as (keyof ObjectOption)[];

    keys.forEach((k) => {
      (this[k] as any) = attrs[k];
    });
    this.dirty = true;
  }

  public getTransform() {
    return this.transform;
  }

  public getAbsoluteTransform(top?: CanvasObject | RenderService): Matrix2D {
    let parentNode = this.parent || this.renderService;
    let absTransform = new Matrix2D(this.transform.m);
    while (parentNode !== null && parentNode !== top) {
      absTransform = new Matrix2D(parentNode.getTransform().m).multiply(
        absTransform
      );
      parentNode = (parentNode as CanvasObject).parent || this.renderService;
    }
    return absTransform;
    // if (parentNode) {
    //   parentTransform = parentNode.getAbsoluteTransform();
    // } else {
    //   parentTransform = this.renderService?.getTransform();
    // }

    // if (parentTransform) {
    //   return new Matrix2D(parentTransform.m).multiply(this.transform);
    // }
    // return new Matrix2D(this.transform.m);
  }

  public updateTransform() {
    if (this.dirty) {
      this.transform.reset();
      this.transform.translate(this.x, this.y);
      this.transform.rotate(this.rotation);
      this.transform.scale(this.scaleX, this.scaleY);
      this.updateBBox();
      this.dirty = false;
    }
  }

  public getAbsoluteBBox() {
    const absTransform = this.getAbsoluteTransform();
    const width = this.getWidth();
    const height = this.getHeight();
    return [
      absTransform.point({
        x: 0,
        y: 0,
      }),
      absTransform.point({
        x: width,
        y: 0,
      }),
      absTransform.point({
        x: width,
        y: height,
      }),
      absTransform.point({
        x: 0,
        y: height,
      }),
    ];
  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.fillStyle = this.fill;
    this.updateTransform();
    const m = this.getAbsoluteTransform().m;
    ctx.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
    this._render(ctx);
    ctx.restore();
  }

  private updateBBox() {
    this.bbox = this.getAbsoluteBBox();
  }

  protected _render(ctx: CanvasRenderingContext2D): void {}

  public isGroup() {
    return false;
  }
}
