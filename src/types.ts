interface Application {}

interface RenderService {}

interface DataService {}

interface EventService {}

let TYPES = {
  Application: Symbol('Application'),
  RenderService: Symbol('RenderService'),
  EventService: Symbol('EventService'),
  DataService: Symbol('DataService'),
  HubService: Symbol('HubService'),
};

export interface Options {
  container: string;
  width: number;
  height: number;
}

export interface Vector2D {
  x: number;
  y: number;
}

export interface BBox {
  topLeft: Vector2D;
  topRight: Vector2D;
  bottomLeft: Vector2D;
  bottomRight: Vector2D;
}

export interface ObjectOption {
  x: number;
  y: number;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  scaleX?: number;
  scaleY?: number;
  rotation?: number;
}

export default TYPES;

export interface Disposable {}
