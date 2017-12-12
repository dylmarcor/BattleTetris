function setToken(token) {
    if (token) {
	localStorage.setItem('token', token);
    } else {
	localStorage.removeItem('token');
    }
}

function getToken() {
    let token = localStorage.getItem('token');
    if (token) {
        let payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp < Date.now() / 1000) {
            localStorage.removeItem('token');
            token = null;
        }
    }
    return token;
}

function removeToken() {
    localStorage.removeItem('token');
}

function getUserFromToken() {
    let token = getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export default {
    setToken,
    getToken,
    removeToken,
    getUserFromToken
};