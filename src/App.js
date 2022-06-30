import './App.css';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

        </Switch>
      
      
      
      </BrowserRouter>
    </div>
  );
}

export default App;
