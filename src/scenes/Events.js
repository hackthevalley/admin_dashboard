import React, {Component}  from 'react';
import {withGlobalContext} from "../contexts/GlobalContext";
import {fetchEventList}    from "../actions/eventActions";
import {Link}              from "react-router-dom";
import ReactTable          from 'react-table'


class EventsScene extends Component {

    async componentDidMount() {
        const {reduce} = this.props.globalContext;
        reduce({fetchingEvents: true});
        reduce(await fetchEventList());
    }

    render() {
        const {events} = this.props.globalContext;
        return (
            <div className={"container-fluid pt-3"}>
                <h3>Events</h3>
                <ReactTable
                    showPaginationTop={true}
                    showPaginationBottom={false}
                    data={events}
                    columns={[
                        {
                            Header: 'Name',
                            accessor: 'name'
                        },
                        {
                            id: 'actions',
                            Header: 'Actions',
                            accessor: d => {
                                return <Link to={`/events/${d._id}/applications`}>View Applications</Link>
                            }
                        }
                    ]}
                />
            </div>
        );
    }
}

export default withGlobalContext(EventsScene);