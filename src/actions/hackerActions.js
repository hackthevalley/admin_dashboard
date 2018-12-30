import htv from 'htv-sdk';

let lastHackerFetch = null;

export async function fetchHackerList() {
    if (!lastHackerFetch) {
        let data = await htv.Graph.query(`
            {
                hackers {
                    _id
                    email_address
                    first_name
                    last_name
                    school
                    phone_number
                    gender
                    dob
                    github
                    linkedin
                    website
                    description
                    created_at
                    applications {
                        _id
                        submitted_at
                        answers {
                            question {
                                name
                                description
                            }
                            _id
                            answers
                        }
                        application {
                            _id
                        }
                    }
                }
            }
        `);
        lastHackerFetch = new Date();
        return {
            hackers: data.hackers,
            fetchingHackers: false
        }
    } else {
        console.log("Already fetched hackers... skipping...");
        return {
            fetchingHackers: false
        }
    }
}