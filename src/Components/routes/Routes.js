"use strict";

import React from 'react';
import Router from 'react-router';

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var routes = (
    <Route name="app" path="/" handler={require('../..')}>
        <DefaultRoute handler={require('../HomePage')}/>
        <Route name="events" handler={require('../events/EventPage')}/>
        <Route name="register" handler={require('../authentication/LoginPage')} />
    </Route>
)

export default Routes;