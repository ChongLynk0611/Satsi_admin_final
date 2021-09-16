import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import ListCollaborators from './pages/ListCollaborators/ListCollaborators';
import AddCollaborators from './pages/AddCollaborators/AddCollaborators';
import EditCollaborators from './pages/EditCollaborators/EditCollaborators';

function Collaborators(props) {
  const match = useRouteMatch();

  return (
    <React.Fragment>
      <Switch>
        <Route exact path={match.url} component={ListCollaborators} />
        <Route path={`${match.url}/Them`} component={AddCollaborators} />
        <Route path={`${match.url}/Sua/:id`} component={EditCollaborators} />
      </Switch>
    </React.Fragment>
  );
}

export default Collaborators;
