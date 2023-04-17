import { injectable, inject } from 'inversify';
import TYPES from '../types';
import { Vector2D } from '../utils/math2D';
import RenderService from './RenderService';

@injectable()
class EventService {
  private renderService: RenderService;

  public constructor(
    @inject(TYPES.RenderService) renderService: RenderService
  ) {
    this.renderService = renderService;
  }

  public init() {
    console.log('event', this.renderService);
    const ele = this.renderService.canvasEle;
    ele.addEventListener('mousedown', (e) => {
      const boundingRect = this.renderService.canvasEle.getBoundingClientRect();
      const point: Vector2D = {
        x: e.clientX - boundingRect.x,
        y: e.clientY - boundingRect.y,
      };
      // todo picking logic
    });
  }
}

export default EventService;
