import { Grid, makeStyles } from '@material-ui/core'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getFilmByIdFromApi, getFilmCredit, getAllFilmsFromApi, getGenresFilmById } from '../../api'
import CardActor from '../../components/cardActor'
import styled from 'styled-components'
import moment from 'moment'

const useStyles = makeStyles({
    container: {
        display: "flex"
    },
})


const Container = styled.div`
    display: flex;
    flex-direction: row;
`
const SubContainer = styled.div`
    flex: 6;
    margin-left: 30px;
`

export default function Film({ film, credit }) {
    const classes = useStyles();

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


    return (
        <>
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
                    <p>{film.overview}</p>
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


export async function getStaticPaths({ params }) {
    const films = await getAllFilmsFromApi()
        .then(r => r)

    return {
        paths: films.map(film => ({
            params: { id: film.id.toString() }
        })),
        fallback: false
    }
}

