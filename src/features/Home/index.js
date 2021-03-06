import React from 'react';
import {Route, Switch, useRouteMatch, useHistory} from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';

function Home (props){
    const match = useRouteMatch();

    return(
        <React.Fragment>
            <Switch>
                <Route exact path={match.url} component={HomePage}/>
            </Switch>
        </React.Fragment>
    )
}

export default Home;