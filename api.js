const API_TOKEN = "e0c04d82cfe80d37f57eecacaaebb02a"

export function getFilmsFromApi(page) {
    const url = 'https://api.themoviedb.org/3/movie/popular?api_key=' + API_TOKEN + '&language=en&page=' + page

    return fetch(url)
        .then((response) => response.json())
        .catch((e) => console.error(e))
}

export async function getAllFilmsFromApi() {
    let url = 'https://api.themoviedb.org/3/movie/popular?api_key=' + API_TOKEN + '&language=en&page=1'
    let list = []
    let page = await fetch(url)
        .then((response) => response.json())
    list = list.concat(page.results)
    
    // -------- enlever 5 et décommenter pour generer toutes les pages en statique
    for (let i = 2; i < 5/*page.total_pages*/; i++) {
        url = 'https://api.themoviedb.org/3/movie/popular?api_key=' + API_TOKEN + '&language=en&page=' + i

        page = await fetch(url)
            .then((response) => response.json())
        list = list.concat(page.results)
    }
    
    return list
}

export async function getAllSeriesFromApi() {
    let url = 'https://api.themoviedb.org/3/tv/popular?api_key=' + API_TOKEN + '&language=en&page=1'
    let list = []
    let page = await fetch(url)
        .then((response) => response.json())
    list = list.concat(page.results)
    
    // -------- enlever 5 et décommenter pour generer toutes les pages en statique
    for (let i = 2; i < 5/*page.total_pages*/; i++) {
        url = 'https://api.themoviedb.org/3/tv/popular?api_key=' + API_TOKEN + '&language=en&page=' + i

        page = await fetch(url)
            .then((response) => response.json())
        list = list.concat(page.results)
    }
    
    return list
}

export function getSeriesFromApi(page) {
    const url = 'https://api.themoviedb.org/3/tv/popular?api_key=' + API_TOKEN + '&language=en&page=' + page

    return fetch(url)

        .then((response) => {
            return response.json()
        })
        .catch((e) => console.error(e))
}

export function getSerieByIdFromApi(serie_id) {
    const url = 'https://api.themoviedb.org/3/tv/' + serie_id + '?api_key=' + API_TOKEN + '&language=en'

    return fetch(url)
        .then((response) => response.json())
        .catch((e) => console.error(e))
}


export function getFilmByIdFromApi(movie_id) {
    const url = 'https://api.themoviedb.org/3/movie/' + movie_id + '?api_key=' + API_TOKEN + '&language=en'

    return fetch(url)
        .then((response) => response.json())
        .catch((e) => console.error(e))
}

export function getGenresFilmById(genre_id) {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_TOKEN + '&language=en'

    return fetch(url)
        .then((response) => {

            return (response.json())
        })
        .catch((e) => console.error(e))
}


export function getGenresSeriesById(genre_id) {
    const url = 'https://api.themoviedb.org/3/genre/tv/list?api_key=' + API_TOKEN + '&language=en'

    return fetch(url)
        .then((response) => {

            return (response.json())
        })
        .catch((e) => console.error(e))
}



export function getFilmCredit(movie_id) {
    const url = 'https://api.themoviedb.org/3/movie/' + movie_id + '/credits?api_key=' + API_TOKEN + '&language=en'

    return fetch(url)
        .then((response) => response.json())
        .catch((e) => console.error(e))
}

export function getSerieCredit(movie_id) {
    const url = 'https://api.themoviedb.org/3/tv/' + movie_id + '/credits?api_key=' + API_TOKEN + '&language=en'

    return fetch(url)
        .then((response) => response.json())
        .catch((e) => console.error(e))
}

export function getFilmsWithSearchedText(text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page=' + page

    return fetch(url)
        .then((response) => response.json())
        .catch((e) => console.error(e))
}