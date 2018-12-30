import React, {Component}  from 'react';
import {login}   from "../actions/loginActions";
import {withGlobalContext} from "../contexts/GlobalContext";
import {withRouter}        from "react-router-dom";

class LoginScene extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    onInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    login = async () => {
        const {reduce} = this.props.globalContext;
        try {
            reduce(await login(this.state.username, this.state.password));
            this.props.history.push("/events");
        } catch (e) {
            window.alert(e.message);
        }
    };

    render() {
        return (
            <div className={"container pt-5"}>
                <div className={"row"}>
                    <div className={"col-lg-6"}>
                        <h1>HTV Administration Portal</h1>
                        <h3>Login</h3>
                        <p>
                            Please login using your administrative credentials.
                        </p>
                        <hr/>
                        <label>Username</label>
                        <input
                            onChange={this.onInputChange}
                            value={this.state.username}
                            className={"form-control"}
                            type={"text"}
                            name={"username"}/>
                        <label className={"pt-1"}>Password</label>
                        <input
                            onChange={this.onInputChange}
                            value={this.state.password}
                            className={"form-control"}
                            type={"password"}
                            name={"password"}/>
                        <br/>
                        <button
                            onClick={this.login}
                            className={"btn btn-primary"}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(withGlobalContext(LoginScene));