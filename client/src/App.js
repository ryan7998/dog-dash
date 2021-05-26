import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

// Walker jobs link
import SingleWalkerJob from "./pages/SingleWalkerJob";
import MyJobHistory from "./pages/MyJobHistory";
import Home from "./pages/Home";

import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import OurJobs from "./pages/OurJobs";
import Cart from "./components/Cart";
// import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import { Provider } from "react-redux";
import { store } from "./utils/store";
import Success from "./pages/Success";
import ProfilePage from "./components/ProfilePage";


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
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/myjobhistory" component={MyJobHistory}/>
            <Route exact path="/cart" component={Cart} />
            <Route
              exact
              path="/singlewalkerjob/:id"
              component={SingleWalkerJob}
            />
            <Route exact path="/profile/:id" component={UserProfile} />
            {/* <Route exact path="/profile/:id" component={ProfilePage} /> */}
            <Route exact path="/success" component={Success} />
            <Route component={NoMatch} />
          </Switch>
        </Provider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
