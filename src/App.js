import "./App.css";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Galerie from "./Components/Galerie/Galerie";
import BackOffice from "./Components/Backoffice/Backoffice";
import GaleriePage from "./Components/Galerie/GaleriePage"
import Contact from "./Components/Contact/Contact";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Navbar />

            <Home />
          </Route>
          <Route exact path="/galerie">
            <Navbar />

            <Galerie />
          </Route>
          <Route path="/galerie/:id">
            <Navbar />

            <GaleriePage />
          </Route>
          <Route path="/contact">
            <Navbar />

            <Contact />
          </Route>
          <Route path="/backoffice">
            <BackOffice />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
