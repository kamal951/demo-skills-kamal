import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Pagination from '@material-ui/lab/Pagination';

import { useEffect, useState } from 'react'
import { getSeriesFromApi } from '../api'
import { Grid } from '@material-ui/core';
import Link from 'next/link';
import moment from 'moment';


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

export default function HomeSerie() {
    const classes = useStyles();

    const [series, setSeries] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        getSeriesFromApi(page).then(r => {
            console.log(r)
            return setSeries(r)
        })
    }, [page])

    
    const handleChange = (event, value) => {
        setPage(value)
    }

    return (
        <Grid container justify="center" spacing={3}>
            {series.results !== undefined ?  series.results.map((item) => {
                return (
                    <Grid item xs={12} md={3}>
                        <Card className={classes.root} variant="outlined">
                            <CardContent>
                                <CardMedia
                                    className={classes.media}
                                    image={"https://image.tmdb.org/t/p/w300" + item.backdrop_path}
                                    title="img serie"
                                />
                                <Typography className={classes.title} color="textPrimary" gutterBottom>
                                    {item.original_name}
                                </Typography>
                                <Typography className={classes.date} color="textSecondary" gutterBottom>
                                    {moment(item.first_air_date).format("DD MMM YYYY")}
                                </Typography>
                                <Chip label={item.vote_average * 10 + "%"} />
                            </CardContent>
                            <CardActions>
                                <Link href={"/serie/" + item.id}>
                                    <a>
                                        Learn More
                                    </a>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            }) : null
        }
        <Pagination count={series !== undefined ? series.total_pages : null} onChange={handleChange}/>
        </Grid>
    )
}