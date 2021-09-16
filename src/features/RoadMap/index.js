import React from 'react';
import {Route, Switch, useRouteMatch, useHistory} from 'react-router-dom';

import RoadMapPage from './pages/RoadMapPage/RoadMapPage';

function RoadMap (props){
    const match = useRouteMatch();

    return(
        <React.Fragment>
            <Switch>
                <Route exact path={match.url} component={RoadMapPage}/>
            </Switch>
        </React.Fragment>
    )
}

export default RoadMap;