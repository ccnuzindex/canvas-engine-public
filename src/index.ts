import Application from './Application';
import container from './inversify.config';
import Rect from './shapes/Rect';
import TYPES from './types';

const createCanvasApp = () => {
  const app = container.get<Application>(TYPES.Application);
  app.init({
    container: 'container',
    width: 800,
    height: 800,
  });
  app.renderService.add(
    new Rect({
      x: 100,
      y: 100,
      fill: 'red',
      width: 300,
      height: 300,
      scaleX: 0.5,
      scaleY: 0.5,
      rotation: Math.PI / 16,
    })
  );
  app.renderService.add(
    new Rect({
      x: 600,
      y: 600,
      fill: 'green',
      width: 300,
      height: 300,
    })
  );
};

export default createCanvasApp;
