import { Application } from './app/classes/Application';
import AccessModule from './app/modules/access/AccessModule';

const modules = [
  AccessModule
];

Application.getInstance(modules).then(
  (app: Application) => {
    console.log('Envvv >>>> ', process.env.CUSTOM_LOGGER_ENABLED);
    app.listen();
  }
).catch((error) => {
  console.log('deu ruim >>>>> ', error);
});
