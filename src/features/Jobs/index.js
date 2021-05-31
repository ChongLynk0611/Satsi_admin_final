import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';

import JobsPage from './pages/JobsPages/JobsPages';
import AddAirNews from './components/AddAirNews/AddAirNews';
import EditAirNews from './components/EditAirNews/EditAirNews';

function Jobs (props){
    const match = useRouteMatch();

    return(
        <React.Fragment>
            <Switch>
                <Route exact path={match.url} component={JobsPage}/>
                <Route path={`${match.url}/Them`} component={AddAirNews}/>
                <Route path={`${match.url}/Sua/:id`} component={EditAirNews}/>
            </Switch>
        </React.Fragment>
    )
}

export default Jobs;