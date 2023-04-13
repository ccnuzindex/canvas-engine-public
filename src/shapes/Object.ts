import { ObjectOption, Vector2D } from '../types';
import { Matrix2D } from '../utils/math2D';

export default class CanvasObject {
  public fill: string;
  public bbox: any;
  public x: number;
  public y: number;
  public scaleX = 1;
  public scaleY = 1;
  public rotation = 0;
  transform = new Matrix2D();

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

  private updateTransform() {
    this.transform.reset();
    this.transform.translate(this.x, this.y);
    this.transform.rotate(this.rotation);
    this.transform.scale(this.scaleX, this.scaleY);
  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.fillStyle = this.fill;
    this.updateTransform();
    const m = this.transform.m;
    ctx.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
    this._render(ctx);
    ctx.restore();
  }

  public containsPoint() {}

  public updateBBox() {}

  public drawController() {}

  protected _render(ctx: CanvasRenderingContext2D): void {}
}
