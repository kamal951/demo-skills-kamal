import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

import { useEffect, useState } from 'react'
import { getFilmsFromApi, getAllFilmsFromApi } from '../api/api'
import { Grid } from '@material-ui/core';
import CardMovie from './cardMovie';

export default function HomeFilm() {

    const [films, setFilms] = useState()
    const [page, setPage] = useState(1)

    useEffect(() => {
        getFilmsFromApi(page).then(r => {
            setFilms(r)
        })
        getAllFilmsFromApi()
    }, [page])

    const handleChange = (event, value) => {
        setPage(value)
    }

    return (
        <Grid container justify="center" spacing={4}>
            {films !== undefined ? films.results.map((item) => {
                return (
                    <Grid item xs={12} md={3} key={"movie"+item.id}>
                        <CardMovie detail={item}/>
                    </Grid>
                )
            }) : null
            }
            <Pagination count={films !== undefined ? films.total_pages : null} onChange={handleChange}/>
        </Grid>
    )
}