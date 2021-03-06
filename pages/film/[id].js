import { Button, Grid, makeStyles, Tooltip } from '@material-ui/core'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getFilmByIdFromApi, getFilmCredit, getGenresFilmById } from '../../api/api'
import CardActor from '../../components/cardActor'
import styled from 'styled-components'
import moment from 'moment'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux'
import { addWatchlist, removeWatchlist, removeFavorite, rateMovie, addFavorite } from '../../redux/actions/userAction'
import { Rating } from '@material-ui/lab'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useRouter } from 'next/router'
import Loading from '../../components/loading'


const Container = styled.div`
    display: flex;
    flex-direction: row;
`
const SubContainer = styled.div`
    flex: 6;
    margin-left: 30px;
`

export default function Film({ film, credit, genres }) {
    const { user, rates, movieWatchlist, fav, login_type } = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    const { isFallback } = useRouter();
    return (
        <>
            {isFallback ?
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <Loading size={60} />
                </div> :
                <>
                    <div style={{ marginLeft: "50px", marginTop: "10px", marginBottom: "30px" }}>
                        <Link href="/" >
                            <a>Back to movies</a>
                        </Link>
                    </div>

                    <br />
                    <Container>
                        <div style={{ flex: 3, marginLeft: "30px" }}>
                            <img src={"https://image.tmdb.org/t/p/w500" + film.backdrop_path} alt="img film" />
                        </div>
                        <SubContainer>
                            <h1>{film.original_title}</h1>
                            {login_type === "user" ?
                                <>
                                    {
                                        fav.findIndex(item => item.id === film.id) !== -1 ?
                                            <Tooltip title="Unlike">
                                                <Button onClick={() => { dispatch(removeFavorite(user, film)) }}><FavoriteIcon /></Button>
                                            </Tooltip> :
                                            <Tooltip title="Like">
                                                <Button onClick={() => { dispatch(addFavorite(user, film)) }}><FavoriteBorderIcon /></Button>
                                            </Tooltip>

                                    }

                                    {
                                        movieWatchlist.findIndex(item => item.id === film.id) !== -1 ?
                                            <Tooltip title="Remove from watchlist">
                                                <Button onClick={() => dispatch(removeWatchlist(user, film))}><VisibilityOffIcon /></Button>
                                            </Tooltip> :
                                            <Tooltip title="Add to watchlist">
                                                <Button onClick={() => dispatch(addWatchlist(user, film))}><VisibilityIcon /></Button>
                                            </Tooltip>
                                    }
                                </> : null
                            }
                            {login_type === "user" || login_type === "guest" ?
                                rates.findIndex(item => item.id === film.id) !== -1 ?
                                    <Rating
                                        name="customized-empty"
                                        defaultValue={rates[rates.findIndex(item => item.id === film.id)].rate / 2}
                                        precision={0.5}
                                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                        onChange={(event, newValue) => {
                                            dispatch(rateMovie(film, newValue * 2, user, login_type))
                                        }}
                                    /> :
                                    <Rating
                                        name="customized-empty"
                                        defaultValue={0}
                                        precision={0.5}
                                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                        onChange={(event, newValue) => {
                                            dispatch(rateMovie(film, newValue * 2, user, login_type))
                                        }}
                                    /> : null
                            }
                            <p>{film.overview}</p>
                            <p>Users Rating:</p>
                            <Rating
                                name="customized-empty"
                                defaultValue={film.vote_average / 2}
                                precision={0.5}
                                readOnly
                                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                            />
                            <p>Date : {moment(film.release_date).format('DD MMM YYYY')}</p>
                            <p>Budget : {film.budget}</p>
                            <p>Revenu : {film.revenue}</p>
                            <p>Genres : {genres.join(', ')}</p>
                            <p>Production : {film.production_companies.map((i) => { return (i.name) }).join(', ')}</p>
                            <p>Original language: {film.original_language}</p>
                        </SubContainer>
                    </Container>
                    <Grid container justify="center" spacing={3}>
                        {credit.cast.slice(0, 9).map((i) => {
                            return (
                                <Grid item xs={12} md={3}>
                                    <CardActor detail={i} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </>
            }
        </>
    )
}


// -------------- Static rendering --------------
export async function getStaticProps({ params }) {
    const film = await getFilmByIdFromApi(params.id)
        .then(r => r)

    const credit = await getFilmCredit(params.id)
        .then(r => r)

    const genres = await getGenresFilmById().then(r => {
        let list = []
        for (let i = 0; i < r.genres.length; i++) {
            for (let j = 0; j < film.genres.length; j++) {
                if (film.genres[j].id === r.genres[i].id) {
                    list.push(film.genres[j].name)
                    break
                }
            }
        }
        return list
    })

    return {
        revalidate: 50,
        props: {
            film: film,
            credit: credit,
            genres: genres
        }
    }
}


export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true
    }
}

