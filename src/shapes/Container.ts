import { ObjectOption } from '../types';
import { Matrix2D } from '../utils/math2D';
import CanvasObject from './Object';

export interface ContainerOptions extends ObjectOption {
  children: CanvasObject[];
}

export default class Container extends CanvasObject {
  public children: CanvasObject[];
  public selectable = false;
  public transform = new Matrix2D([1, 0, 0, 1, -20, -100]);

  constructor(options: ContainerOptions) {
    super(options);
    this.children = options.children;
    this.children.forEach((obj) => {
      obj.parent = this;
    });
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
    this.updateTransform();
    this.children.forEach((obj) => {
      obj.render(ctx);
    });
  }

  public addChild(obj: CanvasObject) {
    obj.parent = this;
    this.children.push(obj);
  }

  public isContainer() {
    return true;
  }
}
