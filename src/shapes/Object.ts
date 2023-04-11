import { ObjectOption, Vector2D } from "../types";

export default class CanvasObject {
  public position: Vector2D;
  public fill: string;
  public bbox: any;

  constructor(options: ObjectOption) {
    this.position = options.position;
    this.fill = options.fill
  }

  public render(ctx: CanvasRenderingContext2D): void {}

  public containsPoint() {}

  public updateBBox() {}

  public drawController() {}
}
