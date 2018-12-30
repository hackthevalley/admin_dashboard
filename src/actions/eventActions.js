import htv from 'htv-sdk';

export async function fetchEventList() {
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
    return {
        events: data.events
    }
}