export const userAction = {
    LOGIN: "LOGIN",
    WATCHLIST: "WATCHLIST",
    FAVORITE: "FAVORITE",
    RATE: "RATE",
    GET_WATCHLIST: 'GET_WATCHLIST'
}

export function login() {
    return async (dispatch) => {
        const url = 'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=' + process.env.REACT_APP_API_TOKEN


        const response = await fetch(url)
            .then((response) => response.json())
            .catch((e) => console.error(e))
        console.log(response)
        dispatch({
            type: userAction.LOGIN,
            value: response
        });

    };
}

export function watchlist(user, movie) {
    return async (dispatch) => {
        const url = 'https://api.themoviedb.org/3/account/' + user.guest_session_id + '/watchlist?api_key=' + process.env.REACT_APP_API_TOKEN
        console.log("watchlist", movie.id)

        await fetch(url, {
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
            .then((response) => response.json())
            .catch((e) => console.error(e))

        dispatch({
            type: userAction.WATCHLIST,
            value: movie
        }
        );
    };
}

export function getWatchlist(user) {
    return async (dispatch) => {
        const url = 'https://api.themoviedb.org/3/account/' + user.guest_session_id + '/watchlist/movies?api_key=' + process.env.REACT_APP_API_TOKEN + '&language=en-US&sort_by=created_at.asc&page=1'

        const response = await fetch(url)
            .then((response) => response.results.json())
            .catch((e) => console.error(e))

        dispatch({
            type: userAction.GET_WATCHLIST,
            value: response
        }
        );
    };
}


export const favorite = (user, fav) => {
    return async (dispatch) => {
        const url = 'https://api.themoviedb.org/3/account/' + user.guest_session_id + '/favorite?api_key=' + process.env.REACT_APP_API_TOKEN

        await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "media_type": "movie",
                "media_id": fav.id,
                "favorite": true
            })
        })
            .then((response) => response.json())
            .catch((e) => console.error(e))

        dispatch({
            type: userAction.FAVORITE,
            value: fav
        }
        );
    };
}



export const rateMovie = (movie, rate, user) => {
    return async (dispatch) => {
        const url = 'https://api.themoviedb.org/3/movie/' + movie.id + '/rating?api_key=' + process.env.REACT_APP_API_TOKEN + '&guest_session_id=' + user.guest_session_id
        console.log(rate)
        await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "value": rate
            })
        })
            .then((response) => response.json())
            .catch((e) => console.error(e))

        dispatch({
            type: userAction.RATE,
            value: { id: movie.id, rate: rate }
        }
        );
    };
}
