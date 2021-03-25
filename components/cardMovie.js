import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
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

export default function CardMovie(props) {
    const classes = useStyles();

    return (
        <>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <CardMedia
                        className={classes.media}
                        image={"https://image.tmdb.org/t/p/w300" + props.detail.backdrop_path}
                        title="img film"
                    />
                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                        {props.detail.original_title}
                    </Typography>
                    <Typography className={classes.date} color="textSecondary" gutterBottom>
                        {moment(props.detail.release_date).format("DD MMM YYYY")}
                    </Typography>
                    <Chip label={props.detail.vote_average * 10 + "%"} />
                </CardContent>
                <CardActions>
                    <Link href={"/film/" + props.detail.id}>
                        <a>
                            Learn More
                                    </a>
                    </Link>
                </CardActions>
            </Card>
        </>
    )
}