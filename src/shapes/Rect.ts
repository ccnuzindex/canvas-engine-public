import { ObjectOption } from "../types";
import CanvasObject from "./Object";

export interface RectOption extends ObjectOption {
  width: number;
  height: number;
}

export default class Rect extends CanvasObject {
  public width: number;
  public height: number;

  constructor(option: RectOption) {
    super(option);
    this.width = option.width;
    this.height = option.height;
  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.fillStyle = this.fill;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.restore();
  }
}
