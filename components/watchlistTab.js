import { Grid, Typography } from '@material-ui/core'
import { CompassCalibrationOutlined } from '@material-ui/icons'
import Pagination from '@material-ui/lab/Pagination'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../api/userApi'
import { getWatchlist } from '../redux/actions/userAction'
import CardMovie from './cardMovie'

export function WatchlistTab() {
    const {user, watchlist_page, movieWatchlist} = useSelector(state => state.userReducer)

    const [page, setPage] = useState(1)

    const dispatch = useDispatch()

    const handleChange = (event, value) => {
        setPage(value)
        dispatch(getWatchlist(user, value))
    }

    useEffect(() => {
        console.log("effect")
        dispatch(getWatchlist(user, page))
    }, [movieWatchlist])

    return (
        <Grid container justify="center">
            <Grid item container justify="center" spacing={3}>
                {watchlist_page.results.length > 0 ?
                    watchlist_page.results.map((item) => {
                        return (
                            <Grid key={"watchlist" + item.id} item xs={12} md={3}>
                                <CardMovie detail={item} />
                            </Grid>
                        )
                    }) :
                    <Typography component="h1" variant="h5">No movies in the watchlist!</Typography>}
            </Grid>
            {watchlist_page !== undefined && watchlist_page.total_pages > 1 ?
                <Grid item >
                    <Pagination style={{ marginTop: "20px" }} count={watchlist_page !== undefined ? watchlist_page.total_pages : null} onChange={handleChange} />
                </Grid> 
                : null}
        </Grid>
    )
}