import RenderService from '../services/RenderService';
import { ObjectOption, Vector2D } from '../types';
import { Matrix2D } from '../utils/math2D';

export default class CanvasObject {
  public fill: string;
  public bbox: Vector2D[] = [];
  public width: number = 0;
  public height: number = 0;
  public x: number;
  public y: number;
  public scaleX = 1;
  public scaleY = 1;
  public rotation = 0;
  transform = new Matrix2D();
  public parent: CanvasObject | null = null;
  public renderService: RenderService | null = null;

  constructor(options: ObjectOption) {
    this.x = options.x;
    this.y = options.y;
    this.fill = options.fill;
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

  public getAbsoluteTransform(): Matrix2D {
    let parentTransform: Matrix2D | undefined;
    let parentNode = this.parent;
    if (parentNode) {
      parentTransform = parentNode.getAbsoluteTransform();
    } else {
      parentTransform = this.renderService?.getTransform();
    }

    if (parentTransform) {
      return new Matrix2D(parentTransform.m).multiply(this.transform);
    }
    return new Matrix2D(this.transform.m);
  }

  private updateTransform() {
    this.transform.reset();
    this.transform.translate(this.x, this.y);
    this.transform.rotate(this.rotation);
    this.transform.scale(this.scaleX, this.scaleY);
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
    this.updateBBox();
    console.log(this.bbox);
    ctx.restore();
  }

  public containsPoint() {}

  public updateBBox() {
    this.bbox = this.getAbsoluteBBox();
  }

  public drawController() {}

  protected _render(ctx: CanvasRenderingContext2D): void {}
}
