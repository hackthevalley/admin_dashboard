import htv from 'htv-sdk';

export async function login(username, password) {
    let token = await htv.User.createToken(username, password);
    localStorage.setItem("token", token);
    htv.setAuthenticationToken(token);
    return {
        authenticationToken: token,
        authenticated: true
    };
}

export async function rehydrateSession() {
    let token = localStorage.getItem("token");
    htv.setAuthenticationToken(token);
    if(token) {
        try {
            let data = await htv.Graph.query(`{ user {_id} }`);
            if(data.user) {
                return {
                    authenticationToken: token,
                    authenticated: true
                }
            } else {
                return {authenticated: false};
            }
        } catch (e) {
            return {authenticated: false};
        }
    } else {
        return {authenticated: false};
    }
}