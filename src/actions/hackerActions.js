import htv from 'htv-sdk';

export async function fetchHackerList() {
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
                        answer
                    }
                    application {
                        _id
                    }
                }
            }
        }
    `);
    return {
        hackers: data.hackers
    }
}