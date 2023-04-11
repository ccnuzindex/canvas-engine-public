import { injectable, inject } from "inversify";
import TYPES from "../types";
import RenderService from "./RenderService";

@injectable()
class EventService {
  private renderService: RenderService;

  public constructor(
    @inject(TYPES.RenderService) renderService: RenderService
  ) {
    this.renderService = renderService;
  }

  public init() {
    console.log("event", this.renderService);
    const ele = this.renderService.canvasEle;
    ele.addEventListener("mousedown", (e) => {
      console.log(e);
    });
  }
}

export default EventService;
