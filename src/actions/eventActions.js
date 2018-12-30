import htv from 'htv-sdk';

let lastEventFetch = null;

export async function fetchEventList() {
    if(!lastEventFetch) {
        let data = await htv.Graph.query(`
            {
                events {
                    _id
                    name
                    applications {
                        _id
                        name
                        description
                    }
                }
            }
        `);
        lastEventFetch = new Date();
        return {
            events: data.events,
            fetchingEvents: false
        }
    } else {
        console.log("Already fetched all events... skipping...");
        return {
            fetchingEvents: false
        }
    }
}