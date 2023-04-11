import { injectable } from "inversify";
import CanvasObject from "../shapes/Object";
import { Options } from "../types";

@injectable()
class RenderService {
  public canvasEle: HTMLCanvasElement;
  public objects: CanvasObject[] = [];
  public canvasWidth: number = 0;
  public canvasHeight: number = 0;

  constructor() {
    this.canvasEle = document.createElement("canvas");
  }

  public add(object: CanvasObject) {
    this.objects.push(object);
    this.renderAll()
  }

  public init(options: Options) {
    const container = document.querySelector(
      `#${options.container}`
    ) as HTMLCanvasElement;
    container.width = options.width;
    container.height = options.height;
    this.canvasWidth = options.width;
    this.canvasHeight = options.height;
    this.canvasEle = container;
  }

  private drawVerticalGrid(ctx: CanvasRenderingContext2D) {
    const GAP = 20;
    const x = 0;
    let y = 0;

    ctx.save();
    ctx.strokeStyle = "gray";

    while (y <= this.canvasWidth) {
      ctx.beginPath();
      ctx.lineTo(0, y);
      ctx.lineTo(this.canvasWidth, y);
      ctx.stroke();
      y += GAP;
    }

    ctx.restore();
  }

  private drawHorizontalGrid(ctx: CanvasRenderingContext2D) {
    const GAP = 20;
    let x = 0;

    ctx.save();
    ctx.strokeStyle = "gray";

    while (x <= this.canvasHeight) {
      ctx.beginPath();
      ctx.lineTo(x, 0);
      ctx.lineTo(x, this.canvasHeight);
      ctx.stroke();
      x += GAP;
    }

    ctx.restore();
  }

  private render() {
    const ctx = this.canvasEle.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.drawHorizontalGrid(ctx);
      this.drawVerticalGrid(ctx);
      this.objects.forEach((obj) => {
        obj.render(ctx);
      });
    }
  }

  public renderAll() {
    requestAnimationFrame(() => {
      this.render();
    });
  }
}

export default RenderService;
