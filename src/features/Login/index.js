import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';

import LoginPage from './pages/LoginPage';

function Home (props){
    const match = useRouteMatch();

    return(
        <React.Fragment>
            <Switch>
                <Route exact path={match.url} component={LoginPage}/>
            </Switch>
        </React.Fragment>
    )
}

export default Home;