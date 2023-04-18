import { injectable } from 'inversify';
import CanvasObject from '../shapes/Object';

interface EventTypeMap {
  mousedown: MouseEvent;
  mouseup: MouseEvent;
  mousemove: MouseEvent;
}

type EventKeys = keyof EventTypeMap;

interface EventObject<EventType extends EventKeys> {
  type: EventType;
  target: CanvasObject;
  evt: EventTypeMap[EventType];
}

type EventListener<This, EventType extends EventKeys> = (
  this: This,
  ev: EventObject<EventType>
) => void;

type EventHandlersMap<This> = {
  [K in keyof EventTypeMap]: Array<EventListener<This, K>>;
};

@injectable()
class HubService {
  private eventHandlersMap: Partial<EventHandlersMap<this>> = {};

  public on<K extends EventKeys>(evtStr: K, handler: EventListener<this, K>) {
    const maps = this.eventHandlersMap as Partial<Record<string, Function[]>>;
    const arr = maps[evtStr];
    if (arr) {
      arr.push(handler);
    } else {
      maps[evtStr] = [handler];
    }
  }

  public off<K extends keyof EventTypeMap>(
    evtStr: K,
    handler: EventListener<this, K>
  ) {
    const maps = this.eventHandlersMap;
    const arr = maps[evtStr];
    if (arr) {
      const idx = arr.indexOf(handler);
      if (idx > -1) {
        arr.splice(idx, 1);
      }
    }
  }

  public emit<K extends keyof EventTypeMap>(
    eventStr: K,
    eventObj: EventObject<K>
  ) {
    const handlers = this.eventHandlersMap[eventStr];
    if (handlers) {
      handlers.forEach((cb) => {
        cb.apply(this, [eventObj]);
      });
    }
  }
}

export default HubService;
