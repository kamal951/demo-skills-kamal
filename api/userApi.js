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
    getPageFavorites,
    rate
};

const baseUrl = "https://api.themoviedb.org/3"

/*
* ===================== LOGIN =====================
*/
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
    const urlUserLogin = 'https://www.themoviedb.org/authenticate/' + token + '?redirect_to=' + process.env.NEXT_PUBLIC_URL + '/close'

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
    user.initialFavorites = favorites

    const rates = await getRate(user)
    user.rates = rates

    return user
}


async function loginAsGuest() {
    // Create a new request token
    const token = await getToken()

    const user = {}
    user.request_token = token.request_token

    // Get Permissions
    const session = await getGuestSession(token.request_token)

    user.session_id = session.guest_session_id

    user.login_type = "guest"

    user.rates = []

    return user
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

/*
* ===================== WATCHLIST =====================
*/

function getPageWatchlist(user, page) {
    const url = baseUrl + '/account/' + user.userDetails.id + '/watchlist/movies?api_key=' + api_token + '&session_id=' + user.session_id + "&page=" + page
    return fetch(url)
        .then(handleResponse)
        .then(resp => {
            return resp;
        });
}

async function getWatchlist(user) {
    let watchlist = []
    let page = await getPageWatchlist(user, 1)

    watchlist = page.results

    for (let i = 2; i < page.total_pages; i++) {
        page = await getPageWatchlist(user, i)
        for (let j = 0; j < page.results; j++) {
            watchlist.push(page.results[j])
        }
    }

    return watchlist
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

/*
* ===================== FAVORITES =====================
*/

function getPageFavorites(user, page) {
    const url = baseUrl + '/account/' + user.userDetails.id + '/favorite/movies?api_key=' + api_token + '&session_id=' + user.session_id + "&page=" + page
    return fetch(url)
        .then(handleResponse)
        .then(resp => {
            return resp;
        });
}

async function getFavorites(user) {
    let favorites = []
    let page = await getPageFavorites(user, 1)

    favorites = page.results

    for (let i = 2; i < page.total_pages; i++) {
        page = await getPageFavorites(user, i)
        for (let j = 0; j < page.results; j++) {
            favorites.push(page.results[j])
        }
    }

    return favorites
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

function rate(movie, user, note, login_type) {
    let url = ""
    if (login_type === "guest") {
        url = 'https://api.themoviedb.org/3/movie/' + movie.id + '/rating?api_key=' + api_token + '&guest_session_id=' + user.session_id
    } else {
        url = 'https://api.themoviedb.org/3/movie/' + movie.id + '/rating?api_key=' + api_token + '&session_id=' + user.session_id
    }

    return fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "value": note
        })
    })
        .then(handleResponse)
        .then(resp => {
            return resp;
        });
}

function getPageRate(user, page) {
    const url = baseUrl + '/account/' + user.userDetails.id + '/rated/movies?api_key=' + api_token + '&session_id=' + user.session_id + '&page=' + page

    return fetch(url)
        .then(handleResponse)
        .then(resp => {
            return resp;
        });
}

async function getRate(user) {
    let rates = []
    let page = await getPageRate(user, 1)

    rates = page.results

    for (let i = 2; i < page.total_pages; i++) {
        page = await getPageRate(user, i)
        for (let j = 0; j < page.results; j++) {
            rates.push(page.results[j])
        }
    }

    let tabRates = []
    for (let i = 0; i < rates.length; i++) {
        tabRates.push({ id: rates[i].id, rate: rates[i].rating })
    }

    return tabRates
}



function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            const error = "Code " + data.status_code + " : " + data.status_message;
            return Promise.reject(error);
        }
        if (data.success !== undefined) {
            if (!data.success) {
                const error = "Code " + data.status_code + " : " + data.status_message;
                return Promise.reject(error);
            }
        }
        return data;
    });
}