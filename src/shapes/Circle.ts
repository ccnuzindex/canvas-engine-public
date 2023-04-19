import { ObjectOption } from '../types';
import CanvasObject from './Object';

export interface CircleOption extends ObjectOption {
  radius: number;
}

export default class Circle extends CanvasObject {
  private radius: number;

  constructor(option: CircleOption) {
    super(option);
    this.radius = option.radius;
  }

  protected _render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.fillStyle = this.fill;
    ctx.beginPath();
    ctx.arc(this.radius, this.radius, this.radius || 0, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  public getWidth() {
    return this.radius * 2;
  }

  public getHeight() {
    return this.radius * 2;
  }
}
