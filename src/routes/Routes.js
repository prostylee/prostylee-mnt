import React, {Component} from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';

import withLayout from '../layouts';
import {allFlattenRoutes as routes, PrivateRoute} from './index';
import {Error404} from '../pages/errors';
import {DemoRoutes} from '../modules/demo/routes/demo-routes';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          {routes.map((route, index) => {
            const CustomRoute = route.route ? route.route : PrivateRoute;
            const exact = typeof route.exact === 'undefined' ? true : route.exact; // Default exact is true
            return (
              !route.items && (
                <CustomRoute
                  key={index}
                  path={route.path}
                  roles={route.roles}
                  exact={exact}
                  component={withLayout(
                    (props) => {
                      return <route.component {...props} />;
                    },
                    route.layoutType,
                    route.label
                  )}
                />
              )
            );
          })}

          // TODO remove
          <DemoRoutes />

          <PrivateRoute
            component={withLayout((props) => {
              return <Error404 {...props} />;
            })}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
