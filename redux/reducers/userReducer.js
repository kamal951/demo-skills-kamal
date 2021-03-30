import { userAction } from '../actions/userAction';

const initialState = {
    user: {},
    movieWatchlist: [],
    fav: [],
    rates: []
}

const userReducer = (state = initialState, action) => {
    let nextState
    switch (action.type) {
        case userAction.LOGIN: {

            nextState = {
                ...state,
                user: action.value
            }
            return nextState || state
        }
        case userAction.WATCHLIST: {

            const watchIndex = state.movieWatchlist.findIndex(item => item.id === action.value.id)

            if (watchIndex !== -1) {
                //suppression
                nextState = {
                    ...state,
                    movieWatchlist: state.movieWatchlist.filter((item, index) => index !== watchIndex)
                }
            } else {
                //Ajout
                nextState = {
                    ...state,
                    movieWatchlist: [...state.movieWatchlist, action.value]
                }
            }
            return nextState || state

        }
        case userAction.FAVORITE: {
            const favIndex = state.fav.findIndex(item => item.id === action.value.id)

            if (favIndex !== -1) {
                //suppression
                nextState = {
                    ...state,
                    fav: state.fav.filter((item, index) => index !== favIndex)
                }
            } else {
                //Ajout
                nextState = {
                    ...state,
                    fav: [...state.fav, action.value]
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
        case userAction.GET_WATCHLIST: {
            nextState = {
                ...state,
                movieWatchlist: action.value
            }
            return nextState || state
        }
        default:
            return state;
    }
}

export default userReducer