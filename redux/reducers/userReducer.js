import { CallToActionOutlined } from '@material-ui/icons';
import { userAction } from '../actions/userAction';

const initialState = {
    user: {},
    movieWatchlist: [],
    fav: [],
    rates: [],
    is_login_loading: false,
    notification: {},
    token: {},
    is_logged: false,
    login_type: "",
    watchlist_page: {results: [], total_pages: 0},
    favorites_page: {results: [], total_pages: 0}
}

const userReducer = (state = initialState, action) => {
    let nextState
    switch (action.type) {
        case userAction.LOGIN_REQUEST: {
            nextState = {
                ...state,
                is_login_loading: true
            }
            return nextState || state
        }
        case userAction.LOGIN_SUCCESS: {
            nextState = {
                ...state,
                is_login_loading: false,
                user: action.value,
                login_type: action.login_type,
                movieWatchlist: action.value.initialWatchlist,
                fav: action.value.initialFavorites
            }
            return nextState || state
        }
        case userAction.LOGIN_FAILURE: {
            nextState = {
                ...state,
                is_login_loading: false,
            }
            return nextState || state
        }
        case userAction.LOGOUT_SUCCESS: {
            nextState = {
                ...state,
                user: {},
                login_type: "",
                movieWatchlist: [],
                fav: [],
                watchlist_page: {results: [], total_pages: 0},
                favorites_page: {results: [], total_pages: 0}
            }
            return nextState || state
        }
        case userAction.GET_WATCHLIST: {
            nextState = {
                ...state,
                watchlist_page: action.value
            }
            return nextState || state
        }
        case userAction.GET_FAVORITES: {
            nextState = {
                ...state,
                favorites_page: action.value
            }
            return nextState || state
        }
        case userAction.ADD_WATCHLIST: {
            const watchIndex = state.movieWatchlist.findIndex(item => item.id === action.value.id)

            if (watchIndex === -1) {
                //Ajout
                nextState = {
                    ...state,
                    movieWatchlist: [...state.movieWatchlist, action.value]
                }
            }
            return nextState || state

        }
        case userAction.REMOVE_WATCHLIST: {

            const watchIndex = state.movieWatchlist.findIndex(item => item.id === action.value.id)

            if (watchIndex !== -1) {
                //suppression
                nextState = {
                    ...state,
                    movieWatchlist: state.movieWatchlist.filter((item, index) => index !== watchIndex)
                }
            }
            return nextState || state

        }
        case userAction.ADD_FAVORITE: {
            const favIndex = state.fav.findIndex(item => item.id === action.value.id)

            if (favIndex === -1) {
                //Ajout
                nextState = {
                    ...state,
                    fav: [...state.fav, action.value]
                }
            }
            return nextState || state
        }
        case userAction.REMOVE_FAVORITE: {
            const favIndex = state.fav.findIndex(item => item.id === action.value.id)

            if (favIndex !== -1) {
                //suppression
                nextState = {
                    ...state,
                    fav: state.fav.filter((item, index) => index !== favIndex)
                }
            }
            return nextState || state
        }
        case userAction.RATE: {
            const rateIndex = state.rates.findIndex(item => item.id === action.value.id)
            const newRates = state.rates
            if (rateIndex !== -1) {
                newRates.splice(rateIndex, 1)
                newRates.push(action.value)
            } else {
                newRates.push(action.value)
            }
            nextState = {
                ...state,
                rates: newRates
            }
            return nextState || state
        }
        default:
            return state;
    }
}

export default userReducer