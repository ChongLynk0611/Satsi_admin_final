import React,{Suspense} from 'react';
import {BrowserRouter, Switch,  Route} from 'react-router-dom';

import NavLeft from 'components/NavLeft/NavLeft';

import './App.css';

const Categories = React.lazy(() => import('features/Categories'));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavLeft />
        <div className="App-body">
          <Suspense fallback={<div>loading...</div>}>
            <Switch>
              <Route path="/DangBai" component={Categories}/>
            </Switch>
          </Suspense>
        </div>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
