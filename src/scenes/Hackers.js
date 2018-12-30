import React, {Component}  from 'react';
import {withGlobalContext} from "../contexts/GlobalContext";
import pick                from "../util/pick";
import {fetchHackerList}   from "../actions/hackerActions";
import {fetchEventList}    from "../actions/eventActions";
import {Link}              from "react-router-dom";
import ReactTable          from 'react-table'

class HackersScene extends Component {

    async componentDidMount() {
        const {reduce} = this.props.globalContext;
        reduce(await fetchEventList());
        reduce(await fetchHackerList());
    }

    render() {
        const {events, hackers}        = this.props.globalContext;
        const {eventId, applicationId} = this.props.match.params;
        const event                    = pick(events, event => event._id === eventId);
        const application              = pick(event ? event.applications : [], application => application._id === applicationId);
        return (
            <div className={"container-fluid pt-3"}>
                <h3>Hackers ({hackers.length})</h3>
                <h4 className={"text-muted"}>
                    {(application ? application.name : "")} - {(event ? event.name : "")}
                </h4>

                <ReactTable
                    showPaginationTop={true}
                    showPaginationBottom={false}
                    data={hackers}
                    columns={[
                        {
                            id: 'fullName',
                            Header: 'Name',
                            accessor: d => d.first_name + " " + d.last_name
                        },
                        {
                            Header: 'Email Address',
                            accessor: 'email_address'
                        },
                        {
                            Header: 'School',
                            accessor: 'school'
                        },
                        {
                            id: 'applicationStatus',
                            Header: 'Application Status',
                            accessor: d => {
                                const hackerApplication = pick(d.applications, app => app.application._id === applicationId);
                                if (!hackerApplication) {
                                    return "Not Started";
                                } else {
                                    if (hackerApplication.submitted_at) {
                                        return "Submitted";
                                    } else {
                                        return "In progress...";
                                    }
                                }
                            }
                        },
                        {
                            id: 'actions',
                            Header: 'Actions',
                            accessor: d => {
                                return <Link
                                    to={`/events/${event._id}/applications/${application._id}/hackers/${d._id}`}>View
                                    Application</Link>
                            }
                        }
                    ]}
                />
            </div>
        );
    }
}

export default withGlobalContext(HackersScene);