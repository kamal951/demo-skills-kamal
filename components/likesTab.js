import { Grid, Typography } from '@material-ui/core'
import { CompassCalibrationOutlined } from '@material-ui/icons'
import Pagination from '@material-ui/lab/Pagination'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFavorites } from '../redux/actions/userAction'
import CardMovie from './cardMovie'

export function LikesTab() {
    const {user, favorites_page, fav} = useSelector(state => state.userReducer)

    const [page, setPage] = useState(1)

    const dispatch = useDispatch()

    const handleChange = (event, value) => {
        setPage(value)
        dispatch(getFavorites(user, value))
    }

    useEffect(() => {
        dispatch(getFavorites(user, page))
    }, [fav])

    return (
        <Grid container justify="center">
            <Grid item container justify="center" spacing={1}>
                {favorites_page.results.length > 0 ?
                    favorites_page.results.map((item) => {
                        return (
                            <Grid key={"watchlist" + item.id} item xs={12} md={3}>
                                <CardMovie detail={item} />
                            </Grid>
                        )
                    }) :
                    <Typography component="h1" variant="h5">No movies in the favorites list!</Typography>}
            </Grid>
            {favorites_page !== undefined && favorites_page.total_pages > 1 ?
                <Grid item >
                    <Pagination style={{ marginTop: "20px" }} count={favorites_page !== undefined ? favorites_page.total_pages : null} onChange={handleChange} />
                </Grid> 
                : null}
        </Grid>
    )
}