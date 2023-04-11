import Application from './Application';
import container from './inversify.config';
import Rect from './shapes/Rect';
import TYPES from './types';

const createCanvasApp = () => {
  const app = container.get<Application>(TYPES.Application);
  app.init({
    container: "container",
    width: 800,
    height: 800
  })
  app.renderService.add(new Rect({
    position: {
      x: 0,
      y: 0
    },
    fill: "red",
    width: 300,
    height: 300
  }))
  app.renderService.add(new Rect({
    position: {
      x: 600,
      y: 600
    },
    fill: "green",
    width: 300,
    height: 300
  }))
};

export default createCanvasApp;
