import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

// Walker jobs link
import WalkerJobs from './pages/WalkerJobs';
import Home from "./pages/Home";
import Upload from "./utils/upload";
// import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import Jobs from "./pages/Jobs";
// //import { StoreProvider } from "./utils/GlobalState";
import { Provider } from "react-redux";
import { store } from "./utils/store";

import Success from "./pages/Success";
// import OrderHistory from "./pages/OrderHistory";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Provider store={store}>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/jobs" component={Jobs} />
            <Route exact path="/walkerjobs" component={WalkerJobs} />
            {/* <Route exact path="/success" component={Success} />
              <Route exact path="/orderHistory" component={OrderHistory} />
              <Route exact path="/products/:id" component={Detail} /> */}
<<<<<<< HEAD
            <Route component={NoMatch} />
          </Switch>
        </Provider>
=======
              <Route component={NoMatch} />
            </Switch>
            <Upload />
          </Provider>
      
>>>>>>> 06bbb4305fbd408e73f1887020c7e674e04f9611
      </Router>
    </ApolloProvider>
  );
}

export default App;
