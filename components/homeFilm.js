import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

import { useEffect, useState } from 'react'
import { getFilmsFromApi, getAllFilmsFromApi } from '../api'
import { Grid } from '@material-ui/core';
import CardMovie from './cardMovie';


const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 20,
    },
    date: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
});

export default function HomeFilm() {
    const classes = useStyles();

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
        <Grid container justify="center" spacing={3}>
            {films !== undefined ? films.results.map((item) => {
                return (
                    <Grid item xs={12} md={3}>
                        <CardMovie detail={item}/>
                    </Grid>
                )
            }) : null
            }
            <Pagination count={films !== undefined ? films.total_pages : null} onChange={handleChange}/>
        </Grid>
    )
}