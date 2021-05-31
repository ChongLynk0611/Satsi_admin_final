import React,{Suspense} from 'react';
import {BrowserRouter, Switch,  Route} from 'react-router-dom';

import NavLeft from 'components/NavLeft/NavLeft';

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
              <Route path="/VeSatsi" component={About}/>
              <Route path="/LoTrinh" component={RoadMap}/>
              <Route path="/DaoTao" component={Education}/>
              <Route path="/HocNgheKhoiNghiep" component={Jobs}/>
              <Route path="/HoatDong" component={Activity}/>
              <Route path="/CongNghe" component={Tech}/>
              <Route path="/Login" component={Login}/>
            </Switch>
          </Suspense>
        </div>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
