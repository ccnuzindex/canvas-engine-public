import { ObjectOption } from "../types";
import CanvasObject from "./Object";

export interface ContainerOptions extends ObjectOption{
  children: CanvasObject[];
}

export default class Container extends CanvasObject {
  public children: CanvasObject[];

  constructor(options: ContainerOptions) {
    super(options);
    this.children = options.children;
  }
}
