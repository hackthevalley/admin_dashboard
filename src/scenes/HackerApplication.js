import React, {Component}  from 'react';
import {withGlobalContext} from "../contexts/GlobalContext";
import {withRouter}        from "react-router-dom";
import {fetchEventList}    from "../actions/eventActions";
import {fetchHackerList}   from "../actions/hackerActions";
import pick                from "../util/pick";

class HackerApplicationScene extends Component {

    async componentDidMount() {
        const {reduce} = this.props.globalContext;
        reduce({fetchingEvents: true, fetchingHackers: true});
        reduce(await fetchEventList());
        reduce(await fetchHackerList());
    }

    render() {
        const {events, hackers}                  = this.props.globalContext;
        const {eventId, applicationId, hackerId} = this.props.match.params;
        const event                              = pick(events, event => event._id === eventId);
        const application                        = pick(event ? event.applications : [], application => application._id === applicationId);
        const hacker                             = pick(hackers, hacker => hacker._id === hackerId);
        const hackerApplication                  = pick(hacker ? hacker.applications : [], app => app.application._id === applicationId);
        return (
            <div className={"container-fluid pt-3"}>
                <h3>Hacker Profile / Application</h3>
                <h4 className={"text-muted"}>{hacker ? hacker.first_name + " " + hacker.last_name : ""}</h4>
                <hr/>
                {hacker ? (
                    <React.Fragment>
                        <h5>Profile</h5>
                        <div className="row">
                            <div className="col-md-9">
                                <table className="table">
                                    <tbody>
                                    <tr>
                                        <th>Full Name</th>
                                        <td>{hacker.first_name} {hacker.last_name}</td>
                                    </tr>
                                    <tr>
                                        <th>Email Address</th>
                                        <td>{hacker.email_address}</td>
                                    </tr>
                                    <tr>
                                        <th>Short Bio</th>
                                        <td>{hacker.description}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone Number</th>
                                        <td>{hacker.phone_number}</td>
                                    </tr>
                                    <tr>
                                        <th>Gender</th>
                                        <td>{hacker.gender}</td>
                                    </tr>
                                    <tr>
                                        <th>Date of Birth</th>
                                        <td>{hacker.dob}</td>
                                    </tr>
                                    <tr>
                                        <th>School</th>
                                        <td>{hacker.school}</td>
                                    </tr>
                                    <tr>
                                        <th>Github</th>
                                        <td>{hacker.github}</td>
                                    </tr>
                                    <tr>
                                        <th>LinkedIn</th>
                                        <td>{hacker.linkedin}</td>
                                    </tr>
                                    <tr>
                                        <th>Personal Website</th>
                                        <td>{hacker.website}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-3">
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=htv-hacker-${hacker._id}`}/>
                                <p className={"text-muted"}>{hacker._id}</p>
                            </div>
                        </div>
                        {hackerApplication ? (
                            <React.Fragment>
                                <h5>Application {hackerApplication.submitted_at ? <span className="badge badge-success">Submitted at {hackerApplication.submitted_at}</span>
                                    : <span className="badge badge-light">In progress...</span>}</h5>
                                <div>
                                    {hackerApplication.answers.map(answer => {
                                        return (
                                            <div>
                                                <hr/>
                                                <p><b>{answer.question.name}</b></p>
                                                <small className={"text-muted"}>{answer.question.description}</small>
                                                {answer.answers.map(response => {
                                                    return <p>{response}</p>;
                                                })}
                                            </div>
                                        );
                                    })}
                                </div>
                            </React.Fragment>
                        ): null}
                    </React.Fragment>
                ) : null}


            </div>
        )
    }

}

export default withRouter(withGlobalContext(HackerApplicationScene));