import React,{Suspense} from 'react';
import {BrowserRouter, Switch,  Route} from 'react-router-dom';

import NavLeft from 'components/NavLeft/NavLeft';

import './App.css';

const Categories = React.lazy(() => import('features/Categories'));
const Home = React.lazy(() => import('features/Home'));
const News = React.lazy(() => import('features/News'));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavLeft />
        <div className="App-body">
          <Suspense fallback={<div>loading...</div>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/DangBai" component={Categories}/>
              <Route path="/TinTuc" component={News}/>
            </Switch>
          </Suspense>
        </div>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
