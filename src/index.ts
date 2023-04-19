import Application from './Application';
import container from './inversify.config';
import Circle from './shapes/Circle';
import Container from './shapes/Container';
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
      fill: 'green',
      width: 300,
      height: 300,
      scaleX: 0.5,
      scaleY: 0.5,
      rotation: Math.PI / 16,
    })
  );

  const layer = new Container({
    x: 300,
    y: 300,
    children: [
      new Rect({
        x: 300,
        y: 300,
        fill: 'green',
        width: 200,
        height: 200,
      }),
      new Circle({
        x: 100,
        y: 100,
        fill: 'green',
        radius: 100,
      }),
    ],
  });

  app.renderService.add(layer);

  app.renderService.renderAll();

  app.hubService.on('mousedown', (evt) => {
    console.log(evt);

    evt.target.setAttrs({
      fill: evt.target.fill === 'red' ? 'green' : 'red',
    });
    app.renderService.renderAll();
  });
};

export default createCanvasApp;
