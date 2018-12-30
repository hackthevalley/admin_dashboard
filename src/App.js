import React, {Component}                             from 'react';
import {withGlobalContext, withGlobalContextProvider} from "./contexts/GlobalContext";
import {Route, Switch, withRouter}                    from "react-router-dom";
import LoginScene                                     from "./scenes/Login";
import EventsScene                                    from "./scenes/Events";
import ApplicationsScene                              from "./scenes/Applications";
import HackersScene                                   from "./scenes/Hackers";
import HackerApplicationScene                         from "./scenes/HackerApplication";
import {rehydrateSession}                             from "./actions/loginActions";

class App extends Component {

    async componentDidMount() {
        const {reduce} = this.props.globalContext;
        let result     = await rehydrateSession();
        reduce(result);
        if (!result.authenticated) this.props.history.push('/');
    }

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path='/' component={LoginScene}/>
                    <Route exact path='/events' component={EventsScene}/>
                    <Route exact path='/events/:eventId/applications' component={ApplicationsScene}/>
                    <Route exact path='/events/:eventId/applications/:applicationId/hackers' component={HackersScene}/>
                    <Route exact path='/events/:eventId/applications/:applicationId/hackers/:hackerId'
                           component={HackerApplicationScene}/>
                </Switch>
            </React.Fragment>
        );
    }
}

export default withRouter(withGlobalContextProvider(withGlobalContext(App)));
