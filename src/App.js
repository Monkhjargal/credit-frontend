import React, { Component } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Provider, connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { addLocaleData, injectIntl } from "react-intl";
import { updateIntl, IntlProvider } from "react-intl-redux";
import en from "react-intl/locale-data/en";

import store from "./store";
// import { storage } from "./utils";
// import { setUser } from "./actions/homepage";

import Layouts from "./layouts/Default";
import "./scss/app.scss";

import ProductPage from "./containers/Homepage";
import messages from "./messages.json";

addLocaleData([...en]);
// Pages
// import LoginPage from 'pages/Login';
// Containers
// import DashboardPage from './containers/Dashboard';

// class Private extends Component {
//   render() {
//     const { auth, path, component: Component, ...rest, } = this.props;

//     const isAuth = auth.user;

//     return (
//       <Route
//         {...rest}
//         render={props =>
//           isAuth ? <Component {...props} /> : <Redirect to="/login" />
//         }
//       />
//     );
//   }
// }

class Public extends Component {
  render() {
    const { auth, component: Component, ...rest } = this.props;
    const isAuth = auth.user;

    return (
      <Route
        {...rest}
        render={props =>
          !isAuth ? <Component {...props} /> : <Redirect to={"/"} />
        }
      />
    );
  }
}

@connect(stores => ({ ...stores }))
@injectIntl
class Localization extends Component {
  componentWillMount() {
    const { formatMessage } = this.props.intl;
    window.formatMessage = formatMessage;
  }

  render() {
    const { auth } = this.props;
    return (
      auth && (
        <Router>
          <Switch>
            {/* <Public
              {...this.props}
              exact
              path="/login"
              component={rest => (
                <LoginPage {...rest} {...this.props} />
              )}
            /> */}
            <Route
              path={"/"}
              render={props => (
                <Layouts {...props} {...this.props}>
                  <ToastContainer />
                  <Switch>
                    <Public
                      {...this.props}
                      {...props}
                      exact
                      path="/"
                      component={rest => <ProductPage {...props} {...rest} />}
                    />
                  </Switch>
                </Layouts>
              )}
            />
          </Switch>
        </Router>
      )
    );
  }
}

class App extends Component {
  componentWillMount() {
    store.dispatch(
      updateIntl({
        locale: "en",
        messages: messages["en"]
      })
    );
    // if (storage.has("user")) {
    //   try {
    //     const user = storage.get("user");
    //     store.dispatch(setUser(user));
    //   } catch (e) { }
    // }
  }

  render() {
    return (
      <Provider store={store}>
        <IntlProvider>
          <Localization />
        </IntlProvider>
      </Provider>
    );
  }
}

export default App;
