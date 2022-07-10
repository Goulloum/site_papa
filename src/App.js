import "./App.css";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Galerie from "./Components/Galerie/Galerie";
import Login from "./Components/Backoffice/Login";
import GaleriePage from "./Components/Galerie/GaleriePage";
import Contact from "./Components/Contact/Contact";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";
import { useState } from "react";

function App() {

  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="App">
      <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === "https:"}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />

              <Home />
            </Route>
            <Route exact path="/galerie">
              <Navbar setDarkMode={setDarkMode} darkMode={darkMode}/>

              <Galerie darkMode={darkMode} />
            </Route>
            <Route path="/galerie/:id">
              <Navbar setDarkMode={setDarkMode} darkMode={darkMode}/>

              <GaleriePage darkMode={darkMode} />
            </Route>
            <Route path="/contact">
              <Navbar setDarkMode={setDarkMode} darkMode={darkMode}/>

              <Contact darkMode={darkMode} />
            </Route>
            <Route path="/backoffice">
              <Login />
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
