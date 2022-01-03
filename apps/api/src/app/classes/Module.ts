import { Application } from './Application';
import Route from '../types/Route';

export default class Module {
  private readonly _routes : Array<Route>;
  public baseRoute: string;

  constructor(baseRoute: string, routes: Array<Route>) {
    this.baseRoute = baseRoute;
    this._routes = routes;
  }

  get routes(): Array<Route> {
    return this._routes;
  }

  public register(app : Application) : void {
    this._routes.forEach((route : Route) => {
      route.path = this.baseRoute + route.path;
      app.registerRoute(this, route);
    });
  };
}
