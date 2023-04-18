import { Container } from 'inversify';
import 'reflect-metadata';
import TYPES from './types';
import RenderService from './services/RenderService';
import EventService from './services/EventService';
import DataService from './services/DataService';
import Application from './Application';
import HubService from './services/HubService';

var container = new Container();
container.bind<DataService>(TYPES.DataService).to(DataService).inRequestScope();
container
  .bind<RenderService>(TYPES.RenderService)
  .to(RenderService)
  .inRequestScope();
container
  .bind<EventService>(TYPES.EventService)
  .to(EventService)
  .inRequestScope();
container.bind<HubService>(TYPES.HubService).to(HubService).inRequestScope();
container.bind<Application>(TYPES.Application).to(Application).inRequestScope();

export default container;
