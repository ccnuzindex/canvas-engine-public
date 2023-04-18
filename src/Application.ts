import { inject, injectable } from 'inversify';
import TYPES, { Options } from './types';
import RenderService from './services/RenderService';
import EventService from './services/EventService';
import DataService from './services/DataService';
import HubService from './services/HubService';

@injectable()
class Application {
  public renderService: RenderService;
  public hubService: HubService;
  private eventService: EventService;
  private dataService: DataService;
  private options: Options = {
    container: '',
    width: 500,
    height: 500,
  };

  public constructor(
    @inject(TYPES.RenderService) renderService: RenderService,
    @inject(TYPES.EventService) eventService: EventService,
    @inject(TYPES.DataService) dataService: DataService,
    @inject(TYPES.HubService) hubService: HubService
  ) {
    this.renderService = renderService;
    this.dataService = dataService;
    this.eventService = eventService;
    this.hubService = hubService;
  }

  public init(options: Options) {
    this.options = options;
    this.renderService.init(options);
    this.eventService.init();
  }
}

export default Application;
