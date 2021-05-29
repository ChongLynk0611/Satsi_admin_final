import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';

// import HomePage from './pages/HomePage/HomePage';
import AddNews from './pages/AddNews/AddNews';

function News (props){
    const match = useRouteMatch();

    return(
        <React.Fragment>
            <Switch>
                {/* <Route exact path={match.url} component={HomePage}/> */}
                <Route path={`${match.url}/Them`} component={AddNews}/>
            </Switch>
        </React.Fragment>
    )
}

export default News;