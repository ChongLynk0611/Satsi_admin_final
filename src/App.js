import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavLeft from 'components/NavLeft/NavLeft';
import { PrivateRoute } from 'components/PrivateRoute';

import './App.css';

const Categories = React.lazy(() => import('features/Categories'));
const Home = React.lazy(() => import('features/Home'));
const News = React.lazy(() => import('features/News'));
const About = React.lazy(() => import('features/About'));
const RoadMap = React.lazy(() => import('features/RoadMap'));
const Education = React.lazy(() => import('features/Education'));
const Jobs = React.lazy(() => import('features/Jobs'));
const Activity = React.lazy(() => import('features/Activity'));
const Login = React.lazy(() => import('features/Login'));
const Tech = React.lazy(() => import('features/Tech'));
const Collaborators = React.lazy(() => import('features/Collaborators'));
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <NavLeft />
        <div className='App-body'>
          <Suspense fallback={<div>loading...</div>}>
            <Switch>
              <PrivateRoute exact path='/' component={Home} />
              <PrivateRoute path='/DangBai' component={Categories} />
              <PrivateRoute path='/TinTuc' component={News} />
              <PrivateRoute path='/VeSatsi' component={About} />
              <PrivateRoute path='/LoTrinh' component={RoadMap} />
              <PrivateRoute path='/DaoTao' component={Education} />
              <PrivateRoute path='/HocNgheKhoiNghiep' component={Jobs} />
              <PrivateRoute path='/HoatDong' component={Activity} />
              <PrivateRoute path='/CongNghe' component={Tech} />
              <PrivateRoute path='/Collaborators' component={Collaborators} />
              <Route path='/Login' component={Login} />
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
