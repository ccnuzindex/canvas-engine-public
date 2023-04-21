import RenderService from '../services/RenderService';
import Group, { GroupOptions } from './Group';
import CanvasObject from './Object';
import Rect from './Rect';

export default class Transformer extends Group {
  private anchors: Record<string, CanvasObject> = {
    topLeft: new Rect({
      x: -10,
      y: -10,
      width: 20,
      height: 20,
      fill: 'yellow',
    }),
    topRight: new Rect({
      x: 0,
      y: 0,
      width: 20,
      height: 20,
      fill: 'yellow',
    }),
    bottomLeft: new Rect({
      x: 0,
      y: 0,
      width: 20,
      height: 20,
      fill: 'yellow',
    }),
    bottomRight: new Rect({
      x: 0,
      y: 0,
      width: 20,
      height: 20,
      fill: 'yellow',
    }),
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

  setAnchorPosition = () => {
    this.anchors.topRight.setAttrs({
      x: this.width - 10,
      y: -10,
    });
    this.anchors.bottomLeft.setAttrs({
      x: -10,
      y: this.height - 10,
    });
    this.anchors.bottomRight.setAttrs({
      x: this.width - 10,
      y: this.height - 10,
    });
  };

  attach(obj: CanvasObject) {
    if (this.parent) {
      const transform = obj.getAbsoluteTransform(this.parent);
      console.log(transform);
      const result = transform.decompose();
      this.setAttrs({
        ...result,
        width: obj.getWidth(),
        height: obj.getHeight(),
      });
      this.setAnchorPosition();
    }
  }

  detach() {}
}
