import React, {Component}  from 'react';
import {withGlobalContext} from "../contexts/GlobalContext";
import {fetchEventList}    from "../actions/eventActions";
import {Link}              from "react-router-dom";
import pick                from "../util/pick";
import ReactTable          from 'react-table'


class ApplicationsScene extends Component {

    async componentDidMount() {
        const {reduce} = this.props.globalContext;
        reduce({fetchingEvents: true});
        reduce(await fetchEventList());
    }

    render() {
        const {events}  = this.props.globalContext;
        const {eventId} = this.props.match.params;
        const event     = pick(events, event => event._id === eventId);
        return (
            <div className={"container-fluid pt-3"}>
                <h3>Applications</h3>
                <h4 className={"text-muted"}>
                    {(event ? event.name : "")}
                </h4>
                <ReactTable
                    showPaginationTop={true}
                    showPaginationBottom={false}
                    data={(event ? event.applications : [])}
                    columns={[
                        {
                            Header: 'Name',
                            accessor: 'name'
                        },
                        {
                            id: 'actions',
                            Header: 'Actions',
                            accessor: d => {
                                return <Link to={`/events/${event._id}/applications/${d._id}/hackers`}>View
                                    Hackers</Link>;
                            }
                        }
                    ]}
                />
            </div>
        );
    }
}

export default withGlobalContext(ApplicationsScene);