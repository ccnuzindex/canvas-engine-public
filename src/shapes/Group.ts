import { ObjectOption } from '../types';
import { Matrix2D } from '../utils/math2D';
import CanvasObject from './Object';

export interface GroupOptions extends ObjectOption {
  children: CanvasObject[];
}

export default class Group extends CanvasObject {
  public children: CanvasObject[];
  public selectable = false;
  public transform = new Matrix2D([1, 0, 0, 1, 0, 0]);

  constructor(options: GroupOptions) {
    super(options);
    this.children = options.children;
    this.children.forEach((obj) => {
      obj.parent = this;
      obj.renderService = this.renderService;
    });
  }

  public getTransform() {
    return this.transform;
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

  public isGroup() {
    return true;
  }
}
