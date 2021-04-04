import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Button, Grid, Tooltip } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { connect, useSelector } from 'react-redux';
import { addFavorite, removeFavorite, addWatchlist, removeWatchlist } from '../redux/actions/userAction';
import { useDispatch } from 'react-redux';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useEffect } from 'react';

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
        paddingTop: '56.25%', // 16:9
    },
});

const CardMovie = props => {
    const classes = useStyles();
    const user = useSelector(state => state.userReducer.user);
    const watchList = useSelector(state => state.userReducer.movieWatchlist)
    const fav = useSelector(state => state.userReducer.fav)
    const login_type = useSelector(state => state.userReducer.login_type)
    const dispatch = useDispatch()

    useEffect(() => {
    }, [user, watchList, fav])

    return (
        <>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <CardMedia
                        className={classes.media}
                        image={"https://image.tmdb.org/t/p/w300" + props.detail.backdrop_path}
                        title="img film"
                    />
                    <Grid container>

                        <Grid item md={8}>
                            <Typography className={classes.title} color="textPrimary" gutterBottom>
                                {props.detail.original_title}
                            </Typography>
                            <Typography className={classes.date} color="textSecondary" gutterBottom>
                                {moment(props.detail.release_date).format("DD MMM YYYY")}
                            </Typography>
                            <Chip label={props.detail.vote_average * 10 + "%"} />
                        </Grid>
                        {login_type === "user" ?
                            <>
                                <Grid item md={2}>
                                    {
                                        fav.findIndex(item => item.id === props.detail.id) !== -1 ?
                                            <Tooltip title="Unlike">
                                                <Button onClick={() => { dispatch(removeFavorite(user, props.detail)) }}><FavoriteIcon /></Button>
                                            </Tooltip> :
                                            <Tooltip title="Like">
                                                <Button onClick={() => { dispatch(addFavorite(user, props.detail)) }}><FavoriteBorderIcon /></Button>
                                            </Tooltip>
                                    }
                                </Grid>
                                <Grid item md={2}>
                                    {
                                        watchList.findIndex(item => item.id === props.detail.id) !== -1 ?
                                            <Tooltip title="Remove from watchlist">
                                                <Button onClick={() => dispatch(removeWatchlist(user, props.detail))}><VisibilityOffIcon /></Button>
                                            </Tooltip> :
                                            <Tooltip title="Add to watchlist">
                                                <Button onClick={() => dispatch(addWatchlist(user, props.detail))}><VisibilityIcon /></Button>
                                            </Tooltip>
                                    }
                                </Grid>
                            </> : null
                        }
                    </Grid>
                </CardContent>
                <CardActions>
                    <Link href={"/film/" + props.detail.id} passHref>
                        <a>Learn More</a>
                    </Link>
                </CardActions>
            </Card>
        </>
    )
}

export default connect(({ movieWatchlist }) => ({ movieWatchlist }), { addWatchlist })(CardMovie);