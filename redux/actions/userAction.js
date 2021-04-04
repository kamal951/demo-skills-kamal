import { toast } from "react-toastify";

export const userAction = {
    LOGIN_REQUEST: "LOGIN_REQUEST",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILURE: "LOGIN_FAILURE",
    LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
    GET_WATCHLIST: "GET_WATCHLIST",
    ADD_WATCHLIST: "ADD_WATCHLIST",
    REMOVE_WATCHLIST: "REMOVE_WATCHLIST",
    GET_FAVORITES: "GET_FAVORITES",
    ADD_FAVORITE: "ADD_FAVORITE",
    REMOVE_FAVORITE: "REMOVE_FAVORITE",
    RATE: "RATE",
}

import { userService } from '../../api/userApi';

const api_token = process.env.NEXT_PUBLIC_API_TOKEN

export function login() {
    return async (dispatch) => {

        dispatch({
            type: userAction.LOGIN_REQUEST,
            value: true
        })

        userService.login()
            .then(
                user => {
                    dispatch(success(user))
                },
                error => {
                    dispatch(
                        failure(error)
                    )
                })

        function success(user) { toast.success("LOGIN SUCCESS"); return { type: userAction.LOGIN_SUCCESS, value: user, login_type: "user" } }
        function failure(error) { toast.error("LOGIN FAILURE : " + error); return { type: userAction.LOGIN_FAILURE } }
    };
}

export function loginAsGuest() {
    return async (dispatch) => {

        dispatch({
            type: userAction.LOGIN_REQUEST,
            value: true
        })

        userService.loginAsGuest()
            .then(
                user => {
                    dispatch(success(user))
                },
                error => {
                    dispatch(
                        failure(error)
                    )
                })

        function success(user) { toast.success("LOGIN SUCCESS"); return { type: userAction.LOGIN_SUCCESS, value: user, login_type: "guest" } }
        function failure(error) { toast.error("LOGIN FAILURE : " + error); return { type: userAction.LOGIN_FAILURE } }
    };
}

export function logout(user) {
    return async (dispatch) => {
        userService.logout(user)
            .then(
                user => {
                    dispatch(success())
                },
                error => {
                    failure(error)
                })

        function success() { toast.success("LOGOUT SUCCESS"); return { type: userAction.LOGOUT_SUCCESS } }
        function failure(error) { toast.error("LOGOUT FAILURE : " + error) }
    };
}

export function addWatchlist(user, movie) {
    return async (dispatch) => {

        userService.addToWatchlist(user, movie)
            .then(
                resp => {
                    dispatch(success(movie))
                },
                error => {
                    failure(error)
                })

        function success(movie) { toast.success("Movie successfully added to watchlist"); return { type: userAction.ADD_WATCHLIST, value: movie } }
        function failure(error) { toast.error("Error : " + error) }
    };
}

export function removeWatchlist(user, movie) {
    return async (dispatch) => {

        userService.removeFromWatchlist(user, movie)
            .then(
                resp => {
                    dispatch(success(movie))
                },
                error => {
                    failure(error)
                })

        function success(movie) { toast.success("Movie successfully removed from watchlist"); return { type: userAction.REMOVE_WATCHLIST, value: movie } }
        function failure(error) { toast.error("Error : " + error) }
    };
}


export function getWatchlist(user, page) {
    return async (dispatch) => {

        userService.getPageWatchlist(user, page)
            .then(
                resp => {
                    dispatch(success(resp))
                },
                error => {
                    failure(error)
                })
        function success(movie) { return { type: userAction.GET_WATCHLIST, value: movie } }
        function failure(error) { toast.error("Error : " + error) }
    };
}

export function getFavorites(user, page) {
    return async (dispatch) => {

        userService.getPageFavorites(user, page)
            .then(
                resp => {
                    dispatch(success(resp))
                },
                error => {
                    failure(error)
                })
        function success(movie) { return { type: userAction.GET_FAVORITES, value: movie } }
        function failure(error) { toast.error("Error : " + error) }
    };
}

export function getFavorite(user) {
    return async (dispatch) => {
        userService.getFavorite(user)
            .then(
                resp => {
                    dispatch(success(resp))
                },
                error => {
                    failure(error)
                })
        function success(movie) { toast.success("Watchlist populated"); return { type: userAction.GET_WATCHLIST, value: movie.results } }
        function failure(error) { toast.error("Error : " + error) }
    };
}

export function addFavorite(user, movie) {
    return async (dispatch) => {

        userService.addToFavorite(user, movie)
            .then(
                resp => {
                    dispatch(success(movie))
                },
                error => {
                    failure(error)
                })

        function success(movie) { toast.success("Movie successfully added to favorites"); return { type: userAction.ADD_FAVORITE, value: movie } }
        function failure(error) { toast.error("Error : " + error) }
    };
}

export function removeFavorite(user, movie) {
    return async (dispatch) => {

        userService.removeFromFavorite(user, movie)
            .then(
                resp => {
                    dispatch(success(movie))
                },
                error => {
                    failure(error)
                })

        function success(movie) { toast.success("Movie successfully removed from favorites"); return { type: userAction.REMOVE_FAVORITE, value: movie } }
        function failure(error) { toast.error("Error : " + error) }
    };
}


export const favorite = (user, fav) => {
    return async (dispatch) => {
        const url = 'https://api.themoviedb.org/3/account/' + user.guest_session_id + '/favorite?api_key=' + api_token

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



export const rateMovie = (movie, note, user, login_type) => {
    return async (dispatch) => {
        await userService.rate(movie, user, note, login_type)
            .then(
                resp => {
                    dispatch(success())
                },
                error => {
                    failure(error)
                })

        function success() { 
            toast.success("Rate success"); 
            return { type: userAction.RATE, value: {id: movie.id, rate: note} } 
        }
        function failure(error) { toast.error("Error : " + error) }
    };
}
