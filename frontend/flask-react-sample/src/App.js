import React from "react";
import "./App.css";
import { TodoPage } from "./pages/todoPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Show } from "./pages/Show";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/:id">
            <Show />
          </Route>
          <Route path="/">
            <TodoPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
