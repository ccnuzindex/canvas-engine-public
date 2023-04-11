interface Application {}

interface RenderService {}

interface DataService {}

interface EventService {}

let TYPES = {
  Application: Symbol("Application"),
  RenderService: Symbol("RenderService"),
  EventService: Symbol("EventService"),
  DataService: Symbol("DataService"),
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
  position: Vector2D;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
}

export default TYPES;
