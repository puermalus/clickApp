import React from 'react';
import './App.css';
import { Router, RouteComponentProps } from "@reach/router";
import Client from "./client/client";
import Dashboard from "./dashboard/dashboard";


function App() {
    return (
        <Router>
            <RouterPage path="/client" pageComponent={<Client />} />
            <RouterPage path="/dashboard" pageComponent={<Dashboard />} />
        </Router>
    );
}

export default App;

const RouterPage = (
    props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;
