import { injectable, inject } from 'inversify';
import CanvasObject from '../shapes/Object';
import Transformer from '../shapes/Transformer';
import TYPES from '../types';
import { isPointInRect, Vector2D } from '../utils/math2D';
import HubService from './HubService';
import RenderService from './RenderService';

// known issue: do not support touch event yet
@injectable()
class EventService {
  private renderService: RenderService;
  private hubService: HubService;

  public constructor(
    @inject(TYPES.RenderService) renderService: RenderService,
    @inject(TYPES.HubService) hubService: HubService
  ) {
    this.renderService = renderService;
    this.hubService = hubService;
  }

  public init() {
    const ele = this.renderService.canvasEle;
    ele.addEventListener('mousedown', this.onMouseDown);
  }

  private onMouseDown = (e: MouseEvent) => {
    const boundingRect = this.renderService.canvasEle.getBoundingClientRect();
    const point: Vector2D = {
      x: e.clientX - boundingRect.x,
      y: e.clientY - boundingRect.y,
    };
    let targetObj: CanvasObject | null = null;
    this.renderService.objects.forEach((obj) => {
      if (obj.selectable && isPointInRect(point, obj.bbox)) {
        targetObj = obj;
      }
    });
    if (targetObj) {
      this.hubService.emit('mousedown', {
        target: targetObj,
        evt: e,
        type: 'mousedown',
      });
      const tr = new Transformer();
      this.renderService.add(tr);
      tr.attach(targetObj);
    }
  };

  private onMouseMove() {}

  private onMouseUp() {}

  private onWheel() {}
}

export default EventService;
