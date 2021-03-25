import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 20,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
});

export default function CardActor(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <CardMedia
                    className={classes.media}
                    image={"https://image.tmdb.org/t/p/w200" + props.detail.profile_path}
                    title="img actor"
                />
                <Typography className={classes.title} color="textPrimary" gutterBottom>
                    {props.detail.name}
                </Typography>
            </CardContent>
        </Card>
    )
}