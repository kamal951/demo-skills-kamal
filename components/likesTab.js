import { Grid } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import CardMovie from './cardMovie'

export function LikesTab(){
    const movies = useSelector(state => state.userReducer.fav)
    return (
        <Grid container justify="center" spacing={3}>
            {movies.map((item) => {
                return (
                    <Grid item xs={12} md={3}>
                        <CardMovie detail={item} />
                    </Grid>
                )
            })}
        </Grid>
    )
}