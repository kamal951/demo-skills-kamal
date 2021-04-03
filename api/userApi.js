const api_token = process.env.NEXT_PUBLIC_API_TOKEN + ""

export const userService = {
    login,
    loginAsGuest,
    logout,
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    addToFavorite,
    removeFromFavorite,
    getPageWatchlist,
    getPageFavorites
};

const baseUrl = "https://api.themoviedb.org/3"

function getToken() {
    const url = baseUrl + '/authentication/token/new?api_key=' + api_token
    return fetch(url)
        .then(handleResponse)
        .then(token => {
            return token;
        });
}

function getUserDetail(session_id) {
    const urlUserLogin = baseUrl + '/account?api_key=' + api_token + '&session_id=' + session_id
    return fetch(urlUserLogin)
        .then(handleResponse)
        .then(resp => {
            return resp;
        });
}

function getSession(token) {
    const usrUserSession = baseUrl + '/authentication/session/new?api_key=' + api_token

    return fetch(usrUserSession, {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "request_token": token
        })
    })
        .then(handleResponse)
        .then(resp => {
            return resp;
        });
}

function getGuestSession(token) {
    const usrUserSession = baseUrl + '/authentication/guest_session/new?api_key=' + api_token

    return fetch(usrUserSession, {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "request_token": token
        })
    })
        .then(handleResponse)
        .then(resp => {
            return resp;
        });
}

function getUserPermission(token) {
    const urlUserLogin = 'https://www.themoviedb.org/authenticate/' + token

    var win = window.open(
        urlUserLogin,
        'Authentication' // <- This is what makes it open in a new window.
    );

    return new Promise(resolve => {
        var timer = setInterval(function () {
            if (win.closed) {
                clearInterval(timer);
                resolve(true)
            }
        }, 500);
    });
}

async function login() {
    // Create a new request token
    const token = await getToken()

    const user = {}
    user.request_token = token.request_token
    
    // Get Permissions
    await getUserPermission(token.request_token)
    
    // Create a new session_id with the athorized request token
    const session = await getSession(user.request_token)
    user.session_id = session.session_id
    
    const userDetails = await getUserDetail(session.session_id)
    user.userDetails = userDetails

    const watchlist = await getWatchlist(user)
    user.initialWatchlist = watchlist

    const favorites = await getFavorites(user)
    user.initialFavorites = favorites.results
    console.log(favorites)
    return user
}


async function loginAsGuest() {
    // Create a new request token
    const token = await getToken()

    const user = {}
    user.request_token = token.request_token
    
    // Get Permissions
    const session = await getGuestSession(token.request_token)
    
    user.session_id = session.session_id
    
    return user
}

function getPageWatchlist(user, page){
    const url = baseUrl + '/account/' + user.userDetails.id + '/watchlist/movies?api_key=' + api_token + '&session_id=' + user.session_id + "&page=" + page
    return fetch(url)
        .then(handleResponse)
        .then(resp => {
            return resp;
        });
}

async function getWatchlist(user){
    let watchlist = []
    let page = await getPageWatchlist(user, 1)

    watchlist = page.results
    console.log("1",page)
    for(let i = 2; i < page.total_pages; i++){
        page = await getPageWatchlist(user, i)
        for(let j = 0; j < page.results; j++){
            watchlist.push(page.results[j])
        }
    }
    console.log("2",watchlist)
    return watchlist
}

function getFavorites(user){
    const url = baseUrl + '/account/' + user.userDetails.id + '/favorite/movies?api_key=' + api_token + '&session_id=' + user.session_id
    return fetch(url)
        .then(handleResponse)
        .then(resp => {
            return resp;
        });
}


function addToWatchlist(user, movie) {
    const url = 'https://api.themoviedb.org/3/account/' + user.userDetails.id + '/watchlist?api_key=' + api_token + '&session_id=' + user.session_id

    return fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "media_type": "movie",
            "media_id": movie.id,
            "watchlist": true
        })
    })
        .then(handleResponse)
        .then(resp => {
            return resp;
        });
}

function removeFromWatchlist(user, movie) {
    const url = 'https://api.themoviedb.org/3/account/' + user.userDetails.id + '/watchlist?api_key=' + api_token + '&session_id=' + user.session_id

    return fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "media_type": "movie",
            "media_id": movie.id,
            "watchlist": false
        })
    })
        .then(handleResponse)
        .then(resp => {
            return resp;
        });
}

function getPageFavorites(user, page){
    const url = baseUrl + '/account/' + user.userDetails.id + '/favorite/movies?api_key=' + api_token + '&session_id=' + user.session_id + "&page=" + page
    return fetch(url)
        .then(handleResponse)
        .then(resp => {
            return resp;
        });
}

function addToFavorite(user, movie) {
    const url = 'https://api.themoviedb.org/3/account/' + user.userDetails.id + '/favorite?api_key=' + api_token + '&session_id=' + user.session_id

    return fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "media_type": "movie",
            "media_id": movie.id,
            "favorite": true
        })
    })
        .then(handleResponse)
        .then(resp => {
            return resp;
        });
}

function removeFromFavorite(user, movie) {
    const url = 'https://api.themoviedb.org/3/account/' + user.userDetails.id + '/favorite?api_key=' + api_token + '&session_id=' + user.session_id

    return fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "media_type": "movie",
            "media_id": movie.id,
            "favorite": false
        })
    })
        .then(handleResponse)
        .then(resp => {
            return resp;
        });
}

function logout(user) {
    const url = 'https://api.themoviedb.org/3/authentication/session?api_key=' + api_token

    return fetch(url, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "session_id": user.session_id
        })
    })
        .then((resp) => resp.json())
        .catch((e) => console.error(e))
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            const error = "Code " + data.status_code + " : " + data.status_message;
            return Promise.reject(error);
        }
        if(data.success !== undefined){
            if(!data.success){
                const error = "Code " + data.status_code + " : " + data.status_message;
                return Promise.reject(error);
            }
        }
        return data;
    });
}