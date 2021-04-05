import moment from 'moment'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getSerieByIdFromApi, getAllSeriesFromApi, getGenresSeriesById, getSerieCredit } from '../../api/api'
import styled from 'styled-components'
import { Grid, Typography } from '@material-ui/core'
import CardActor from '../../components/cardActor'
import Loading from '../../components/loading'
import { useRouter } from 'next/router';

const Container = styled.div`
    display: flex;
    flex-direction: row;
`
const SubContainer = styled.div`
    flex: 6;
    margin-left: 30px;
`
export default function Serie({ serie, credits, genres }) {
    const { isFallback } = useRouter();

    return (
        <>
            {isFallback ?
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <Loading size={60} />
                </div> :
                <>
                    <div style={{ marginLeft: "50px", marginTop: "10px", marginBottom: "30px" }}>
                        <Link href="/series">
                            <a>Back to series</a>
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
                        {credits.cast.slice(0, 9).map((i) => {
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

    const serieDetail = await getSerieByIdFromApi(params.id)
        .then(r => r)

    const credits = await getSerieCredit(params.id)
        .then(r => r)

    const genres = await getGenresSeriesById().then(r => {
        let list = []
        for (let i = 0; i < r.genres.length; i++) {
            for (let j = 0; j < serieDetail.genres.length; j++) {
                if (serieDetail.genres[j].id === r.genres[i].id) {
                    list.push(serieDetail.genres[j].name)
                    break
                }
            }
        }
        return list
    })
    
    return {
        props: {
            serie: serieDetail,
            credits: credits,
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

