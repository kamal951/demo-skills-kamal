import moment from 'moment'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getSerieByIdFromApi, getAllSeriesFromApi, getGenresSeriesById, getSerieCredit } from '../../api/api'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'
import CardActor from '../../components/cardActor'

const Container = styled.div`
    display: flex;
    flex-direction: row;
`
const SubContainer = styled.div`
    flex: 6;
    margin-left: 30px;
`
export default function Serie({ serie, credit }) {
    const [genres, setGenres] = useState([])
    useEffect(() => {
        getGenresSeriesById(serie.genres).then(r => {
            let list = []
            for (let i = 0; i < r.genres.length; i++) {
                for (let j = 0; j < serie.genres.length; j++) {
                    if (serie.genres[j].id === r.genres[i].id) {
                        list.push(serie.genres[j].name)
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
                <Link href="/">
                    <a>
                        Retour
              </a>
                </Link>
            </div>
            <br />

            <Container>
                <div style={{ flex: 3, marginLeft: "30px" }}>
                    <img src={"https://image.tmdb.org/t/p/w500" + serie.backdrop_path} alt="img serie" />
                </div>
                <SubContainer>
                    <h1>{serie.name}</h1>
                    <p>{serie.overview}</p>
                    <p>First air date : {moment(serie.first_air_date).format('DD MMM YYYY')}</p>
                    <p>Created by : {serie.created_by.map((i) => i.name).join(', ')}</p>
                    <p>Genres : {genres.join(', ')}</p>
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
    const serie = await getSerieByIdFromApi(params.id)
        .then(r => r)

    const credit = await getSerieCredit(params.id)
        .then(r => r)
    return {
        props: {
            serie,
            credit
        }
    }
}

export async function getStaticPaths() {
    const series = await getAllSeriesFromApi()
        .then(r => r)

    return {
        paths: series.map(serie => ({
            params: { id: serie.id.toString() }
        })),
        fallback: false
    }
}

