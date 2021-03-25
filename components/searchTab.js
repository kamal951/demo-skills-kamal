import { Button, Grid, TextField } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useState } from "react";
import { getFilmsWithSearchedText } from "../api";
import CardMovie from "./cardMovie";

export default function SearchTab() {
    const [search, setSearch] = useState("")
    const [result, setResult] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const handleChange = (e) => {
        const { name, value } = e.target
        setSearch(value)
    }

    const handleClick = () => {

        getFilmsWithSearchedText(search, page).then((r) => {
            setTotalPages(r.total_pages)
            setResult(r.results)
        })
    }

    const handleChangePage = (event, value) => {
        
        setPage(value)
        getFilmsWithSearchedText(search, value).then((r) => {
            setTotalPages(r.total_pages)
            setResult(r.results)
        })
    }

    return (
        <div style={{ textAlign: "center" }}>
            <TextField id="outlined-basic" style={{ width: "80%" }} label="Search" variant="outlined" onChange={handleChange} />
            <Button onClick={handleClick}>Search</Button>
            <br />
            <br />
            <Grid container justify="center" spacing={3}>
                {result !== undefined ? result.map((i) => {
                    return (
                        <>
                            <Grid item xs={12} md={3}>
                                <CardMovie detail={i} />
                            </Grid>
                        </>
                    )
                }) : null}
                {totalPages > 0 ? <Pagination count={totalPages} onChange={handleChangePage} /> : null}
            </Grid>

        </div>
    )
}