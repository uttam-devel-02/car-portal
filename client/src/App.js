import './App.css';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

// Route
import PublicRoute from './core/components/PublicRoute';

// Dashboard
import { Dashboard } from "./core/pages/Home";

import { Car } from "./core/pages/Car";

// CarList
import { CarList } from "./core/pages/CarList/";

function App() {

  return (
    <BrowserRouter>
        <Switch>
        <Redirect exact from="/" to="/dashboard"></Redirect>
          <PublicRoute component={Dashboard} path="/dashboard" exact />
          <PublicRoute component={Car} path="/car" exact />
          <PublicRoute component={Car} path="/car-edit/:carId" exact />
          <PublicRoute component={CarList} path="/car-list" exact />
        </Switch>
    </BrowserRouter>
  );

  
}

export default App;
