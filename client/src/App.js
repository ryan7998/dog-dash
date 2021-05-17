import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

// Walker jobs link
import SingleWalkerJob from './pages/SingleWalkerJob';
import MyJobHistory from './pages/MyJobHistory';
import Home from "./pages/Home";
import Upload from "./utils/upload";
// import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import OurJobs from "./pages/OurJobs";
import Cart from "./components/Cart";
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
            <Route exact path="/ourjobs" component={OurJobs} />
            <Route exact path="/myjobhistory" component={MyJobHistory} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/singlewalkerjob/:id" component={SingleWalkerJob} />
            {/* <Route exact path="/success" component={Success} />
              <Route exact path="/orderHistory" component={OrderHistory} />
              <Route exact path="/products/:id" component={Detail} /> */}
              <Route component={NoMatch} />
            </Switch>
            
          </Provider>
      
      </Router>
    </ApolloProvider>
  );
}

export default App;
