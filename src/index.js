import React              from 'react';
import ReactDOM           from 'react-dom';
import App                from './App';
import * as serviceWorker from './serviceWorker';
import {HashRouter}       from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-table/react-table.css';
import {rehydrateSession} from "./actions/loginActions";

rehydrateSession();

ReactDOM.render((
    <HashRouter>
        <App/>
    </HashRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
