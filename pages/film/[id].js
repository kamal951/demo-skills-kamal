import { Button, Grid, makeStyles, Tooltip } from '@material-ui/core'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getFilmByIdFromApi, getFilmCredit, getAllFilmsFromApi, getGenresFilmById } from '../../api'
import CardActor from '../../components/cardActor'
import styled from 'styled-components'
import moment from 'moment'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux'
import { addWatchlist, favorite, rateMovie } from '../../redux/actions/userAction'
import { Rating } from '@material-ui/lab'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Header from '../../components/header'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


const Container = styled.div`
    display: flex;
    flex-direction: row;
`
const SubContainer = styled.div`
    flex: 6;
    margin-left: 30px;
`

export default function Film({ film, credit }) {

    const [genres, setGenres] = useState([])
    useEffect(() => {
        getGenresFilmById(film.genres).then(r => {
            let list = []
            for (let i = 0; i < r.genres.length; i++) {
                for (let j = 0; j < film.genres.length; j++) {
                    if (film.genres[j].id === r.genres[i].id) {
                        list.push(film.genres[j].name)
                        break
                    }
                }
            }
            setGenres(list)
        })
    }, [])


    const user = useSelector(state => state.userReducer.user)
    const rates = useSelector(state => state.userReducer.rates)
    const watchList = useSelector(state => state.userReducer.movieWatchlist)    
    const fav = useSelector(state => state.userReducer.fav)

    const dispatch = useDispatch()

    return (
        <>
            <Header />
            <div style={{ marginLeft: "50px", marginTop: "20px" }}>
                <Link href="/" >
                    <a >
                        Retour
              </a>
                </Link>
            </div>

            <br />
            <Container>
                <div style={{ flex: 3, marginLeft: "30px" }}>
                    <img src={"https://image.tmdb.org/t/p/w500" + film.backdrop_path} alt="img film" />
                </div>
                <SubContainer>
                    <h1>{film.original_title}</h1>
                    {user.success !== undefined ?
                        <>
                            {
                                fav.findIndex(item => item.id === film.id) !== -1 ?
                                    <Tooltip title="Like">
                                        <Button onClick={() => { dispatch(favorite(user, film)) }}><FavoriteIcon /></Button>
                                    </Tooltip> :
                                    <Tooltip title="Unlike">
                                        <Button onClick={() => { dispatch(favorite(user, film)) }}><FavoriteBorderIcon /></Button>
                                    </Tooltip>
                            }

                            {
                                watchList.findIndex(item => item.id === film.id) !== -1 ?
                                    <Tooltip title="Remove from watchlist">
                                        <Button onClick={() => dispatch(addWatchlist(user, film))}><VisibilityOffIcon /></Button>
                                    </Tooltip> :
                                    <Tooltip title="Add to watchlist">
                                        <Button onClick={() => dispatch(addWatchlist(user, film))}><VisibilityIcon /></Button>
                                    </Tooltip>
                            }
                            {rates.findIndex(item => item.id === film.id) !== -1 ?
                                <Rating
                                    name="customized-empty"
                                    defaultValue={rates[rates.findIndex(item => item.id === film.id)].rate}
                                    precision={0.5}
                                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                    readOnly
                                /> :
                                <Rating
                                    name="customized-empty"
                                    defaultValue={0}
                                    precision={0.5}
                                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                    onChange={(event, newValue) => {
                                        dispatch(rateMovie(film, newValue, user))
                                    }}
                                />
                            }

                        </> : null
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
    )
}


// -------------- Static rendering --------------
export async function getStaticProps({ params }) {
    const film = await getFilmByIdFromApi(params.id)
        .then(r => r)

    const credit = await getFilmCredit(params.id)
        .then(r => r)

    return {
        props: {
            film,
            credit
        }
    }
}


export async function getStaticPaths() {
    const films = await getAllFilmsFromApi()
        .then(r => r)

    return {
        paths: films.map(film => ({
            params: { id: film.id.toString() }
        })),
        fallback: false
    }
}

