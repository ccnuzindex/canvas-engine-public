import RenderService from '../services/RenderService';
import Group, { GroupOptions } from './Group';
import CanvasObject from './Object';
import Rect from './Rect';

export default class Transformer extends Group {
  private anchors: Record<string, CanvasObject> = {
    topLeft: new Rect({
      x: 0,
      y: 0,
      width: 20,
      height: 20,
      fill: 'red',
    }),
    // topRight: new Rect({
    //   x: 0,
    //   y: 0,
    //   width: 20,
    //   height: 20,
    // }),
    // bottomLeft: new Rect({
    //   x: 0,
    //   y: 0,
    //   width: 20,
    //   height: 20,
    // }),
    // bottomRight: new Rect({
    //   x: 0,
    //   y: 0,
    //   width: 20,
    //   height: 20,
    // }),
  };

  constructor() {
    super({
      x: 0,
      y: 0,
      children: [],
    });
    Object.keys(this.anchors).forEach((k) => {
      this.addChild(this.anchors[k]);
    });
  }

  attach(obj: CanvasObject) {
    if (this.parent) {
      const transform = obj.getAbsoluteTransform(this.parent);
      console.log(transform);
      const result = transform.decompose();
      this.setAttrs({
        ...result,
      });
    }
  }

  detach() {}
}
